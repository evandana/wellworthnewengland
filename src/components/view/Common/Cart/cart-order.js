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
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import './styles.css';

class CartOrder extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
    
        const { products, open, placeOrder, onClose, user } = this.props;

        const productsOrdered = [];
        
        // item: "a"
        // key: "asdf123"
        // name: "A name"
        // optionKey: "qwer123"
        // optionPrice: 10
        // optionSize: "big"
        // quantity: 10
        products.forEach( product => {
            if (product.options) {
                product.options.forEach( option => {
                    if (option.quantity > 0) {
                        productsOrdered.push({
                            title: product.title,
                            item: product.item,
                            key: product.item || Math.round(Math.random()*1000),
                            name: product.title,
                            optionKey: option.key,
                            optionPrice: option.price,
                            optionSize: option.size,
                            quantity: option.quantity,
                        })
                    }
                })
            }
        });

        const total = productsOrdered.reduce((sum, curr) => { return sum + curr.quantity * curr.optionPrice}, 0);

        const optionsStyles = {
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

        return (
            <div>
                <Dialog
                    title={'Order Confirmation'}
                    modal={false}
                    autoScrollBodyContent={true}
                    actions={[
                        <FlatButton
                            label="Close"
                            secondary={true}
                            keyboardFocused={true}
                            onClick={onClose}
                        />,
                        <RaisedButton
                            label="Submit"
                            primary={true}
                            keyboardFocused={true}
                            onClick={() => {
                                placeOrder(
                                    productsOrdered,
                                    {
                                        timestamp: new Date().getTime(),
                                        customerInfo: {
                                            email: user.email,
                                            name: user.displayName,
                                        },
                                        total,
                                    }
                                )
                                onClose();
                            }}
                        />
                    ]}
                    onRequestClose={onClose}
                    open={open}
                    >
                    <Table selectable={false} multiSelectable={false} style={{tableLayout: 'auto' }} fixedHeader={false}>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                            <TableRow>
                                <TableHeaderColumn className="cart-item" style={{textAlign: 'center'}}>Date</TableHeaderColumn>
                                <TableHeaderColumn className="cart-name" style={{textAlign: 'center'}}>Size</TableHeaderColumn>
                                <TableHeaderColumn className="cart-name" style={{textAlign: 'center'}}>Email</TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn className="cart-name" colSpan={3} style={{textAlign: 'center'}}>Text input for notes</TableHeaderColumn>
                                {/* <TableHeaderColumn className="cart-item" style={{textAlign: 'center'}}>Total: ${total/100}</TableHeaderColumn> */}
                            </TableRow>
                            <TableRow>
                                <TableHeaderColumn className="cart-item" >Item</TableHeaderColumn>
                                <TableHeaderColumn className="cart-name" >Size</TableHeaderColumn>
                                {/* <TableHeaderColumn className="cart-option-price" >Option Price</TableHeaderColumn> */}
                                <TableHeaderColumn className="cart-quantity" >Quantity</TableHeaderColumn>
                                {/* <TableHeaderColumn className="cart-quantity" >Cost Per Line</TableHeaderColumn> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {productsOrdered.length && productsOrdered.map((product, index) => {
                            return <TableRow key={product.optionKey}>
                                <TableRowColumn className="cart-item">{product.optionKey}</TableRowColumn>
                                <TableRowColumn className="cart-name" style={{whiteSpace: 'normal'}}>{product.title} ({product.optionSize ? product.optionSize : <span style={{color:'#ccc'}}>one size</span>})</TableRowColumn>
                                {/* <TableRowColumn className="cart-option-price" style={{whiteSpace: 'normal'}}><span style={{color:'#ccc'}}>@</span> ${product.optionPrice/100}</TableRowColumn> */}
                                <TableRowColumn className="cart-quantity" style={{whiteSpace: 'normal'}}><span style={{color:'#ccc'}}>x</span>  {product.quantity}</TableRowColumn>
                                {/* <TableRowColumn className="cart-option-price" style={{whiteSpace: 'normal'}}><span style={{color:'#ccc'}}>=</span>  ${product.optionPrice * product.quantity/100}</TableRowColumn> */}
                            </TableRow>
                            })}
                        </TableBody>
                    </Table>
                    <p>Pricing will be resolved in the usual manner.</p>
                </Dialog>
            </div>
        )
    };
}

export default CartOrder;