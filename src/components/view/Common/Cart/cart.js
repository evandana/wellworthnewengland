import React, { Component } from 'react';
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
import Snackbar from 'material-ui/Snackbar';

import { RESPONSE_CODE_FAIL } from 'constants';
import { CartOrder } from 'components/view/Common/Cart';
import ControlledTextField from 'components/view/Common/ControlledTextField';
import './styles.css';

class Cart extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            openOrderModal: false,
          };
    }
    
    render() {

        const { user, products, toggleShowDescription, placeOrder, updateQuantity, clearOrderResponses, clearProductQuantities, asyncResponses } = this.props;

        const totalCost = products.length ? products.length > 1 ? products.reduce( (productSum, product) => {
            return reduceProduct(productSum) + reduceProduct(product);
        }) : reduceProduct(products[0]) : 0;
    
        function reduceProduct (product) {
            if (!product) {
                return 0;
            } if (typeof product === "number") {
                return product;
            } else if (product.options.length > 1) {
                return product.options.reduce( (optionSum, option) => {
                    let sum = (typeof optionSum === "number" ? optionSum : optionSum.price * optionSum.quantity);
                    let optionVal = option.price * (option.quantity||0);
                    return sum + optionVal;
                })||0;
            } else if (product.options.length === 1) {
                return product.options[0].price * (product.options[0].quantity||0);
            } else {
                return 0;
            }
        }
    
        const optionsStyles = {
            key: {
                paddingLeft: '0',
                color: '#aaa',
                paddingRight: '0.5em',
                width: '6em',
            },
            size: {
                paddingLeft: '0',
                textAlign: 'right',
                paddingRight: '1em',
                width: '4em',
            },
            price: {
                paddingLeft: '0',
                textAlign: 'right',
                paddingRight: '1em',
                width: '4em',
            },
            quantity: {
                paddingLeft: '0',
                paddingRight: '0',
                fontSize: '12px',
                width: '4em',
            },
        }

        let onCloseHander = () => {
            this.setState({openOrderModal: false});
        }

        const enableOrderButton = totalCost > 0;

        const recentOrderResponseStatus = asyncResponses && asyncResponses.placeOrderResponses && asyncResponses.placeOrderResponses.length && asyncResponses.placeOrderResponses[0] && asyncResponses.placeOrderResponses[0].status;

        const placeOrderResponseMessage = recentOrderResponseStatus === 400 ? 
            'Order placement error: Authentication' : 
            'Order successfully placed' ; //  Please try again later or contact your representative directly.
        
        let clearFormAndResponses = () => {
            
            clearOrderResponses();

            // clear values if it was on error
            // if response was success, values already cleared
            if (recentOrderResponseStatus === 400) {
                clearProductQuantities();
            }
        }

        return (
            <div style={{minWidth:'850px'}}>
                { asyncResponses.placeOrderResponses.length ? 
                    <Snackbar
                        open={asyncResponses.placeOrderResponses.length ? true : false}
                        message={placeOrderResponseMessage}
                        action="dismiss"
                        autoHideDuration={recentOrderResponseStatus === 400 ? 0 : 4000}
                        onActionTouchTap={clearFormAndResponses}
                        onRequestClose={clearFormAndResponses}
                        style={{top:'64px', bottom:''}}
                    /> : 
                    '' 
                }
                <CartOrder 
                    products={products}
                    user={user}
                    open={this.state.openOrderModal}
                    onClose={onCloseHander}
                    placeOrder={placeOrder}
                    />
                <Table selectable={false} multiSelectable={false} onCellClick={toggleShowDescription} style={{tableLayout: 'auto' }} fixedHeader={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                        <TableRow>
                            <TableHeaderColumn className="cart-name" style={{textAlign: 'center'}}></TableHeaderColumn>
                            <TableHeaderColumn className="cart-item" style={{textAlign: 'center'}}>Total: ${totalCost/100}</TableHeaderColumn>
                            <TableHeaderColumn className="cart-name" style={{textAlign: 'center'}}>
                                <RaisedButton label="Place Order" primary={true} disabled={!enableOrderButton} onClick={() => { this.setState({openOrderModal: true}) } } />
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn className="cart-name" >Name</TableHeaderColumn>
                            <TableHeaderColumn className="cart-options" >Options</TableHeaderColumn>
                            <TableHeaderColumn className="cart-description" >Description</TableHeaderColumn>
                            {/* <TableHeaderColumn className="cart-cost" >Cost</TableHeaderColumn> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {products.length && products.map((product, index) => {
                        return <TableRow key={product.options[0].key}>
                            <TableRowColumn className="cart-name" style={product.expanded ? {whiteSpace: 'normal'} : {}}>{product.title}</TableRowColumn>
                            <TableRowColumn className="cart-options" style={product.expanded ? {whiteSpace: 'normal'} : {width: '24em'}}>
                                <Table selectable={false}><TableBody displayRowCheckbox={false} style={optionsStyles.details} >
                                {product.options && product.options.length && product.options.map((option, index) => {
                                    return <TableRow key={product.item + '__option_' + index} >
                                        <TableRowColumn style={optionsStyles.key} >{option.key}</TableRowColumn>
                                        <TableRowColumn style={optionsStyles.size} >{option.size}</TableRowColumn>
                                        <TableRowColumn style={optionsStyles.price} >${option.price/100}</TableRowColumn>
                                        <TableRowColumn style={optionsStyles.quantity} >
                                            <ControlledTextField
                                                quantity={option.quantity}
                                                optionKey={option.key}
                                                key={
                                                    /* providing a new key reinitializes the component, therefore resetting value to 0
                                                       without violating the controlled/uncontrolled principle */
                                                    option.quantity === 0 ? 'key-'+Math.round(Math.random()*100000) : option.key
                                                    }
                                                productItem={product.item}
                                                updateQuantity={updateQuantity}
                                                />
                                        </TableRowColumn>
                                    </TableRow>
                                })}
                                </TableBody></Table>
                            </TableRowColumn>
                            <TableRowColumn className="cart-description" style={product.expanded ? {whiteSpace: 'normal'} : {}}>{product.description}</TableRowColumn>
                            {/* <TableRowColumn className="cart-cost" style={product.expanded ? {whiteSpace: 'normal'} : {}}>${product.cost}</TableRowColumn> */}
                       </TableRow>
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }

};

export default Cart;