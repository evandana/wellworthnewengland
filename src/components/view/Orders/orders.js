import React from 'react';
import { Redirect } from 'react-router-dom';
import NotAuthorized from 'components/view/NotAuthorized';
import {
    LABEL_PLACED,
    LABEL_CONFIRMED,
    LABEL_OUT_FOR_DELIVERY,
    LABEL_FULFILLED,
    
    COL_CUSTOMER,
    COL_DATE,
    COL_STATUS,
} from 'constants.js';
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
    
    const orderStatesText = [
        LABEL_PLACED,
        LABEL_CONFIRMED,
        LABEL_OUT_FOR_DELIVERY,
        LABEL_FULFILLED,
    ];

    function getStateObjByControlIndex (controlIndex) {
        let state = {};
        orderStatesProps.forEach((stateProp, propIndex) => {
            state[stateProp] = propIndex <= controlIndex;
        }) ;
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
        if (ordersFilterObj.col === COL_STATUS) {
            return ordersFilterObj.vals.includes( getStepIndexFromState(order.state) );
        } else if (ordersFilterObj.col === COL_CUSTOMER) {
            return ordersFilterObj.vals.includes( order.customerInfo.name );
        }
    });
    
    // sort orders
    sortedFilteredOrders = ordersSortObj.col === '' || ordersSortObj.dir === 0 ? orders : sortedFilteredOrders.sort((a,b) => {
        if (ordersSortObj.col === COL_STATUS) {
            let diff = getStepIndexFromState(a[ordersSortObj.col]) - getStepIndexFromState(b[ordersSortObj.col]);
            if (diff === 0) {
                return 0;
            } else {
                diff = diff > 0 ? 1 : -1;
            }
            return ( ordersSortObj.dir === 2 ? -1 : 1 ) * diff;
        }
        if (ordersSortObj.col === COL_DATE) {
            let diff = b.timestamp > a.timestamp ? 1 : -1;
            return ( ordersSortObj.dir === 2 ? -1 : 1 ) * diff;
        }
        if (ordersSortObj.col === COL_CUSTOMER) {
            let diff = b.customerInfo.name > a.customerInfo.name ? -1 : 1;
            return ( ordersSortObj.dir === 2 ? -1 : 1 ) * diff;
        }
    });

    // styles for the icon based on sort obj
    let sortIconStyles = {
        [COL_STATUS]: {
            root: { marginLeft:'6px' },
            icon: { color: '#ccc' }
        },
        [COL_DATE]: {
            root: { marginLeft:'6px' },
            icon: { color: '#ccc' }
        },
        [COL_CUSTOMER]: {
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
        [COL_STATUS]: {
            root: {},
            icon: { color: '#ccc' },
        },
        [COL_CUSTOMER]: {
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
                        <TableHeaderColumn className="order-date">
                            <div
                                style={{float:'left', lineHeight:'48px'}}>
                                Date 
                            </div>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={sortIconStyles[COL_DATE].icon}
                                hoveredStyle={{background:'#eee'}}
                                style={sortIconStyles[COL_DATE].root}
                                onClick={() => {
                                    requestSortOrderTable(COL_DATE);
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
                                iconStyle={sortIconStyles[COL_CUSTOMER].icon}
                                hoveredStyle={{background:'#eee'}}
                                style={sortIconStyles[COL_CUSTOMER].root}
                                onClick={() => {
                                    requestSortOrderTable(COL_CUSTOMER);
                                }}
                                >
                                sort
                            </IconButton>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={filterIconStyles[COL_CUSTOMER].icon}
                                hoveredStyle={{background:'#eee'}}
                                style={filterIconStyles[COL_CUSTOMER].root}
                                onClick={() => {
                                    let col = ordersFilterObj.col === COL_CUSTOMER ? '' : COL_CUSTOMER;
                                    requestFilterOrderTable(col, []);
                                }}
                                >
                                filter_list
                            </IconButton>
                        </TableHeaderColumn>
                        {/* <TableHeaderColumn className="order-total">Total</TableHeaderColumn> */}
                        <TableHeaderColumn className="order-state">
                            <div
                                style={{float:'left', lineHeight:'48px'}}>
                                State 
                            </div>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={sortIconStyles[COL_STATUS].icon}
                                hoveredStyle={{background:'#eee'}}
                                style={sortIconStyles[COL_STATUS].root}
                                onClick={() => {
                                    requestSortOrderTable(COL_STATUS);
                                }}
                                >
                                sort
                            </IconButton>
                            <IconButton 
                                iconClassName="material-icons"
                                iconStyle={filterIconStyles[COL_STATUS].icon}
                                hoveredStyle={{background:'#eee'}}
                                style={filterIconStyles[COL_STATUS].root}
                                onClick={() => {
                                    let col = ordersFilterObj.col === COL_STATUS ? '' : COL_STATUS;
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
                            {ordersFilterObj.col !== COL_CUSTOMER ? '' : (
                            <SelectField
                                multiple={true}
                                hintText='Filter by...'
                                style={{width:'160px'}}
                                value={ordersFilterObj.vals}
                                onChange={(evt, index, vals) => {
                                    requestFilterOrderTable(COL_CUSTOMER, vals)
                                }}
                                >
                                {users.map( (user, index) => {
                                    return <MenuItem key={index} value={user} primaryText={user} />
                                })}
                            </SelectField> )}
                        </TableHeaderColumn>
                        {/* <TableHeaderColumn className="order-total"></TableHeaderColumn> */}
                        <TableHeaderColumn className="order-state">
                            {ordersFilterObj.col !== COL_STATUS ? '' : (
                            <SelectField
                                multiple={true}
                                hintText='Filter by...'
                                style={{width:'160px'}}
                                value={ordersFilterObj.vals}
                                onChange={(evt, index, vals) => {
                                    requestFilterOrderTable(COL_STATUS, vals)
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
                            {/* <TableRowColumn className="order-total" >${order.total/100}</TableRowColumn> */}
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