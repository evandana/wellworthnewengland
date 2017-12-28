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
import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
  } from 'material-ui/Stepper';
  import Dialog from 'material-ui/Dialog';


const OrderDetails = (props) => {

    const { order, toggleOrderDetails, orderKey, openDetailsModal, getStepIndexFromState, orderStatesText } = props;

    return(
        <div>
            <Dialog
                title={'Order ' + order.number}
                modal={false}
                autoScrollBodyContent={true}
                actions={[
                    <FlatButton
                        label="Close"
                        primary={true}
                        keyboardFocused={true}
                        onClick={() => {
                            toggleOrderDetails( orderKey, false );
                        }}
                    />
                ]}
                onRequestClose={() => {
                    toggleOrderDetails( orderKey, false );
                }}
                open={openDetailsModal}
                >
                <Stepper activeStep={getStepIndexFromState(order.state)}>
                    {orderStatesText.map( (text,index) => {
                        return <Step key={index}><StepLabel>{text}</StepLabel></Step>
                    })}
                </Stepper>
                <Table 
                    selectable={false} 
                    multiSelectable={false} 
                    style={{tableLayout: 'auto' }} 
                    fixedHeader={false}
                    >
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                        <TableRow>
                            <TableHeaderColumn className="order-name">Name</TableHeaderColumn>
                            <TableHeaderColumn className="order-size">Size</TableHeaderColumn>
                            {/* <TableHeaderColumn className="order-price">Price</TableHeaderColumn> */}
                            <TableHeaderColumn className="order-quantity">Quantity</TableHeaderColumn>
                            {/* <TableHeaderColumn className="order-total">Total per Item</TableHeaderColumn> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody 
                        displayRowCheckbox={false}
                        >
                        {order.items && order.items.map((item, index) => {

                            return <TableRow key={item.key + index}>
                                <TableRowColumn className="order-name" >{item.name}</TableRowColumn>
                                <TableRowColumn className="order-size" >{item.optionSize}</TableRowColumn>
                                {/* <TableRowColumn className="order-price" >${item.optionPrice}</TableRowColumn> */}
                                <TableRowColumn className="order-quantity" >{item.quantity}</TableRowColumn>
                                {/* <TableRowColumn className="order-total" >${item.quantity * item.optionPrice}</TableRowColumn> */}
                            </TableRow>

                        })}
                    </TableBody>
                </Table>
            </Dialog>
        </div>
    );
    
}

export default OrderDetails;