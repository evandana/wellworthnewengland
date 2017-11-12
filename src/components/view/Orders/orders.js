import React from 'react';
import { Redirect } from 'react-router-dom';
import NotAuthorized from 'components/view/NotAuthorized';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

// TODO: why is this not loading the constants correctly?
import { ORDERS_COL_STATE } from '../../../constants';
import { TimeFormatter } from 'components/view/Common/Helpers';
import { OrderDetails } from 'components/view/Orders';

const Orders = (props) => {
    
    const { 
        location, 
        userPermissions, 
        toggleOrderDetails, 
        orders,
        orderDetails, 
        requestUpdateOrder, 
        requestSortOrderTable,
        requestFilterOrderTable,
        ordersSortObj,
        ordersFilterObj,
    } = props;
    
    const notAuthProps = {
        from: location
    };

    const orderStatesProps = [
        'placed',
        'confirmed',
        'outForDelivery',
        'fulfilled',
    ];

    // TODO: move to constants
    const orderStatesText = [
        'Placed',
        'Confirmed',
        'Out for Delivery',
        'Fulfilled'
    ];

    function getStateObjByControlIndex (controlIndex) {
        let state = {};
        orderStatesProps.forEach((stateProp, propIndex) => {
            state[stateProp] = propIndex <= controlIndex;
        }) 
        return state;
    }

    function getOrderText(orderState = {}) {
        return orderStatesText[getStepIndexFromState(orderState)];
    }

    function getStepIndexFromState (orderState) {
        if (orderState[orderStatesProps[3]]) {
            return 3;
        } else if (orderState[orderStatesProps[2]]) {
            return 2;
        } else if (orderState[orderStatesProps[1]]) {
            return 1;
        } else {
            return 0;
        }
    }

    function getOrderNumber (key) {
        return key.substr(1,6);
    }

    // NOTE: this may at some point be better served by getting user list from db
    const users = orders
        .map(order => order.customerInfo.name)
        .filter((customerName, index, self) => self.indexOf(customerName) === index);

    // filter orders
    let sortedFilteredOrders = ordersFilterObj.col === '' || ordersFilterObj.vals.length === 0 ? orders : orders.filter(order => {
        if (ordersFilterObj.col === 'state') {
            return ordersFilterObj.vals.includes( getStepIndexFromState(order.state) );
        } else if (ordersFilterObj.col === 'customer') {
            return ordersFilterObj.vals.includes( order.customerInfo.name );
        }
    });
    
    // sort orders
    sortedFilteredOrders = ordersSortObj.col === '' || ordersSortObj.dir === 0 ? orders : sortedFilteredOrders.sort((a,b) => {
        if (ordersSortObj.col === 'state') {
            let diff = getStepIndexFromState(a[ordersSortObj.col]) - getStepIndexFromState(b[ordersSortObj.col]);
            if (diff === 0) {
                return 0;
            } else {
                diff = diff > 0 ? 1 : -1;
            }
            return ( ordersSortObj.dir === 2 ? -1 : 1 ) * diff;
        }
        if (ordersSortObj.col === 'timestamp') {
            let diff = b.timestamp > a.timestamp ? 1 : -1;
            return ( ordersSortObj.dir === 2 ? -1 : 1 ) * diff;
        }
        if (ordersSortObj.col === 'customer') {
            let diff = b.customerInfo.name > a.customerInfo.name ? -1 : 1;
            return ( ordersSortObj.dir === 2 ? -1 : 1 ) * diff;
        }
    });

    // styles for the icon based on sort obj
    let sortIconStyles = {
        state: {
            root: { marginLeft:'6px' },
            icon: { color: '#ccc' }
        },
        timestamp: {
            root: { marginLeft:'6px' },
            icon: { color: '#ccc' }
        },
        customer: {
            root: { marginLeft:'6px' },
            icon: { color: '#ccc' }
        }
    };

    if (ordersSortObj.col && sortIconStyles[ordersSortObj.col]) {
        // root
        const dirTransformStyle = ordersSortObj.dir === 2 ? {transform:'rotateZ(180deg)'} : {};
        sortIconStyles[ordersSortObj.col].root = Object.assign( 
            sortIconStyles[ordersSortObj.col].root,
            dirTransformStyle,
        );
        // icon
        const dirColorActiveStyle = ordersSortObj.dir > 0 ? { color: '#f00' } : {};
        sortIconStyles[ordersSortObj.col].icon = Object.assign( 
            sortIconStyles[ordersSortObj.col].icon,
            dirColorActiveStyle
        );
    }
    
    let filterIconStyles = {
        state: {
            root: {},
            icon: { color: '#ccc' },
        },
        customer: {
            root: {},
            icon: { color: '#ccc' },
        },
    };

    if (ordersFilterObj.col && filterIconStyles[ordersFilterObj.col]) {
        // icon
        const dirColorActiveStyle = { color: '#f00' };
        filterIconStyles[ordersFilterObj.col].icon = Object.assign( 
            filterIconStyles[ordersFilterObj.col].icon,
            dirColorActiveStyle
        );
    }


    let selectionRenderer = (values) => {
        switch (values.length) {
          case 0:
            return '';
          case 1:
            return orderStatesText[values[0]];
          default:
            return `${values.length} states selected`;
        }
      }

    const showFilterRow = ordersFilterObj.col === '' ? {display:'none'} : {};

    const orderView = (
        <div>
            {sortedFilteredOrders.length && sortedFilteredOrders.map((order) => {

                order.number = getOrderNumber(order.key);

                if (order.detailsOpen) {
                    return <OrderDetails 
                        key={order.key}
                        orderKey={order.key}
                        order={order}
                        toggleOrderDetails={toggleOrderDetails}
                        openDetailsModal={true}
                        getStepIndexFromState={getStepIndexFromState}
                        orderStatesText={orderStatesText}
                        />
                } else {
                    return false;
                }

            })}
            <Table 
                selectable={false} 
                multiSelectable={false} 
                style={{tableLayout: 'auto' }} 
                fixedHeader={false}
                onCellClick={ (row, cell) => {
                    if (cell != 3) {
                        let key = sortedFilteredOrders[row].key;
                        toggleOrderDetails( key, true );
                    }
                }}
                >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                    <TableRow>
                        {/* <TableHeaderColumn className="order-number">Order #</TableHeaderColumn> */}
                        <TableHeaderColumn className="order-number">
                            <div
                                style={{float:'left', lineHeight:'48px'}}>
                                Date 
                            </div>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={sortIconStyles.timestamp.icon}
                                hoveredStyle={{background:'#eee'}}
                                style={sortIconStyles.timestamp.root}
                                onClick={() => {
                                    requestSortOrderTable('timestamp');
                                }}
                                >
                                sort
                            </IconButton>
                        </TableHeaderColumn>
                        <TableHeaderColumn className="order-customer">
                            <div
                                style={{float:'left', lineHeight:'48px'}}>
                                Customer 
                            </div>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={sortIconStyles.customer.icon}
                                hoveredStyle={{background:'#eee'}}
                                style={sortIconStyles.customer.root}
                                onClick={() => {
                                    requestSortOrderTable('customer');
                                }}
                                >
                                sort
                            </IconButton>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={filterIconStyles.customer.icon}
                                hoveredStyle={{background:'#eee'}}
                                style={filterIconStyles.customer.root}
                                onClick={() => {
                                    let col = ordersFilterObj.col === 'customer' ? '' : 'customer';
                                    requestFilterOrderTable(col, []);
                                }}
                                >
                                filter_list
                            </IconButton>
                        </TableHeaderColumn>
                        <TableHeaderColumn className="order-total">Total</TableHeaderColumn>
                        <TableHeaderColumn className="order-state">
                            <div
                                style={{float:'left', lineHeight:'48px'}}>
                                State 
                            </div>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={sortIconStyles.state.icon}
                                hoveredStyle={{background:'#eee'}}
                                style={sortIconStyles.state.root}
                                onClick={() => {
                                    requestSortOrderTable('state');
                                }}
                                >
                                sort
                            </IconButton>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={filterIconStyles.state.icon}
                                hoveredStyle={{background:'#eee'}}
                                style={filterIconStyles.state.root}
                                onClick={() => {
                                    let col = ordersFilterObj.col === 'state' ? '' : 'state';
                                    requestFilterOrderTable(col, []);
                                }}
                                >
                                filter_list
                            </IconButton>
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow
                        style={showFilterRow}>
                        <TableHeaderColumn className="order-number"></TableHeaderColumn>
                        <TableHeaderColumn className="order-customer">
                            {ordersFilterObj.col !== 'customer' ? '' : (
                            <SelectField
                                multiple={true}
                                hintText='Filter by...'
                                style={{width:'160px'}}
                                value={ordersFilterObj.vals}
                                onChange={(evt, index, vals) => {
                                    requestFilterOrderTable('customer', vals)
                                }}
                                >
                                {users.map( (user, index) => {
                                    return <MenuItem key={index} value={user} primaryText={user} />
                                })}
                            </SelectField> )}
                        </TableHeaderColumn>
                        <TableHeaderColumn className="order-total"></TableHeaderColumn>
                        <TableHeaderColumn className="order-state">
                            {ordersFilterObj.col !== 'state' ? '' : (
                            <SelectField
                                multiple={true}
                                hintText='Filter by...'
                                style={{width:'160px'}}
                                value={ordersFilterObj.vals}
                                onChange={(evt, index, vals) => {
                                    requestFilterOrderTable('state', vals)
                                }}
                                >
                                {orderStatesText.map( (orderStateText, index) => {
                                    return <MenuItem key={index} value={index} primaryText={orderStateText} />
                                })}
                            </SelectField> )}
                        </TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody 
                    displayRowCheckbox={false}
                    showRowHover={true}
                    deselectOnClickaway={true}
                    >
                    {sortedFilteredOrders.length && sortedFilteredOrders.map((order) => {

                        // const number = getOrderNumber(order.key);
                        
                        return <TableRow key={order.key}>
                            {/* <TableRowColumn className="order-number" >{number}</TableRowColumn> */}
                            <TableRowColumn className="order-timestamp" >
                                <TimeFormatter
                                    time={order.timestamp}
                                    />
                            </TableRowColumn>
                            <TableRowColumn className="order-customer" >
                                {order.customerInfo.name}
                            </TableRowColumn>
                            <TableRowColumn className="order-total" >${order.total/100}</TableRowColumn>
                            <TableRowColumn className="order-state" >
                                <SelectField
                                    floatingLabelText=""
                                    style={{width:'160px'}}
                                    value={getStepIndexFromState(order.state)}
                                    onChange={(evt, index) => {
                                        order.state = getStateObjByControlIndex(index);
                                        requestUpdateOrder(order.key, order)
                                    }}
                                    >
                                    {orderStatesText.map( (orderStateText, index) => {
                                        return <MenuItem key={index} value={index} primaryText={orderStateText} />
                                    })}
                                </SelectField>
                            </TableRowColumn>
                        </TableRow>

                    })}
                </TableBody>
            </Table>
        </div>
    );

    return (
        <div className='page'>
            <h2>ORDERS</h2>
            { userPermissions.admin || userPermissions.seller ? 
                orderView :
                <NotAuthorized {...notAuthProps} /> 
            }
        </div>
    );
    
}

export default Orders;