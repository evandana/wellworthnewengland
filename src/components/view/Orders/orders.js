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
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { OrderDetails } from 'components/view/Orders'


const Orders = (props) => {
    
    const { location, userPermissions, toggleOrderDetails, orders, orderDetails } = props;
    
    const notAuthProps = {
        from: location
    };

    // TODO: move to constants
    const orderStatesText = [
        'Placed',
        'Confirmed',
        'Out for Delivery',
        'Fulfilled'
    ];

    function getOrderText(orderState = {}) {
        return orderStatesText[getStepIndexFromState(orderState)];
    }

    function getStepIndexFromState (orderState) {
        let totalSteps = orderStatesText.length - 1;
        if (orderState.fulfilled) {
            return totalSteps - 1;
        } else if (orderState.outForDelivery) {
            return totalSteps - 2;
        } else if (orderState.confirmed) {
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
                onCellClick={ (row) => {
                    let key = ordersArr[row];
                    toggleOrderDetails( key, true );
                }}
                >
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                    <TableRow>
                        <TableHeaderColumn style={{textAlign: 'center'}}>a</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign: 'center'}}>b</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign: 'center'}}>c</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign: 'center'}}>d</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign: 'center'}}>e</TableHeaderColumn>
                    </TableRow>
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
                                {getOrderText(order.state)}
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