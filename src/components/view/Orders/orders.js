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

import { OrderDetails } from 'components/view/Orders'

const Orders = (props) => {
    
    const { location, userPermissions, toggleOrderDetails, orders, orderDetails, requestUpdateOrder } = props;
    
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

    const ordersArr = Object.keys(orders)

    function getOrderNumber (key) {
        return key.substr(1,6);
    }

    const orderView = (
        <div>
            {ordersArr.length && ordersArr.map((key) => {

                const order = orders[key];

                order.number = getOrderNumber(key);

                if (order.detailsOpen) {
                    return <OrderDetails 
                        key={key}
                        orderKey={key}
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
                        let key = ordersArr[row];
                        toggleOrderDetails( key, true );
                    }
                }}
                >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                    <TableRow>
                        <TableHeaderColumn className="order-number">Order #</TableHeaderColumn>
                        <TableHeaderColumn className="order-customer">Customer</TableHeaderColumn>
                        <TableHeaderColumn className="order-total">Total</TableHeaderColumn>
                        <TableHeaderColumn className="order-state">State</TableHeaderColumn>
                        <TableHeaderColumn className="order-items">Unique Items</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody 
                    displayRowCheckbox={false}
                    showRowHover={true}
                    deselectOnClickaway={true}
                    >
                    {ordersArr.length && ordersArr.map((key) => {

                        const order = orders[key];
                        const number = getOrderNumber(key);
                        
                        return <TableRow key={key}>
                            <TableRowColumn className="order-number" >{number}</TableRowColumn>
                            <TableRowColumn className="order-customer" >
                                {order.customerInfo.name}
                            </TableRowColumn>
                            <TableRowColumn className="order-total" >${order.total/100}</TableRowColumn>
                            <TableRowColumn className="order-state" >
                                <SelectField
                                    floatingLabelText=""
                                    value={getStepIndexFromState(order.state)}
                                    onChange={(evt, index) => {
                                        order.state = getStateObjByControlIndex(index);
                                        requestUpdateOrder(key, order)
                                    }}
                                    >
                                    {orderStatesText.map( (orderStateText, index) => {
                                        return <MenuItem key={index} value={index} primaryText={orderStateText} />
                                    })}
                                </SelectField>
                            </TableRowColumn>
                            <TableRowColumn className="order-items" >
                                {order.items.length}
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