import React from 'react';
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
import './styles.css';

const Cart = (props) => {
    
    const { products, toggleShowDescription, updateQuantity } = props;

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
    
    return <div style={{minWidth:'850px'}}>
            <hr style={{width:'100%', clear: 'both'}}/>
            <Table selectable={false} multiSelectable={false} onCellClick={toggleShowDescription} style={{tableLayout: 'auto' }} fixedHeader={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
                    <TableRow>
                        <TableHeaderColumn className="cart-item" style={{textAlign: 'center'}}></TableHeaderColumn>
                        <TableHeaderColumn className="cart-name" style={{textAlign: 'center'}}></TableHeaderColumn>
                        <TableHeaderColumn className="cart-item" style={{textAlign: 'center'}}>Total: ${totalCost/100}</TableHeaderColumn>
                        <TableHeaderColumn className="cart-name" style={{textAlign: 'center'}}>
                            <RaisedButton label="Place Order" primary={true} disabled />
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn className="cart-item" >Item #</TableHeaderColumn>
                        <TableHeaderColumn className="cart-name" >Name</TableHeaderColumn>
                        <TableHeaderColumn className="cart-options" >Options</TableHeaderColumn>
                        <TableHeaderColumn className="cart-description" >Description</TableHeaderColumn>
                        {/* <TableHeaderColumn className="cart-cost" >Cost</TableHeaderColumn> */}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {products.length && products.map((product, index) => {
                    return <TableRow key={product.item}>
                        <TableRowColumn className="cart-item" style={product.expanded ? {whiteSpace: 'normal'} : {}}>{product.item}</TableRowColumn>
                        <TableRowColumn className="cart-name" style={product.expanded ? {whiteSpace: 'normal'} : {}}>{product.name}</TableRowColumn>
                        <TableRowColumn className="cart-options" style={product.expanded ? {whiteSpace: 'normal'} : {}}>
                            <Table selectable={false}><TableBody displayRowCheckbox={false} style={optionsStyles.details} >
                            {product.options && product.options.length && product.options.map((option, index) => {
                                return <TableRow key={product.item + '__option_' + index} style={{width: '12em'}} >
                                    <TableRowColumn style={optionsStyles.size} >{option.size}</TableRowColumn>
                                    <TableRowColumn style={optionsStyles.price} >${option.price/100}</TableRowColumn>
                                    <TableRowColumn style={optionsStyles.quantity} >
                                        <TextField
                                            defaultValue={option.quantity > 0 ? option.quantity : null}
                                            underlineShow={true}
                                            inputStyle={{background:'#fafafa', margin: '12px 0', height: '24px', paddingLeft: '4px'}}
                                            hintStyle={{color: '#999', zIndex: 2, paddingLeft: '4px'}}
                                            style={{width:'3em'}}
                                            underlineStyle={{bottom: '12px'}}
                                            hintText="#"
                                            type="number"
                                            onChange={(evt, newQuantity) => {
                                                updateQuantity(product.item, option.key, newQuantity);
                                            }}
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
};

export default Cart;


// {false && products.length && products.map((product, index) => {
//     return <Card key={index}
//         style={{width:'30%', margin:'1em', float: 'left'}}>
//     <CardHeader
//     title={product.name}
//     /* subtitle="Subtitle" */
//     actAsExpander={true}
//     showExpandableButton={true}
//     children={<Table selectable={false} style={tableStyle}><TableBody displayRowCheckbox={false} style={optionsStyles.details} >
//         {product.options && product.options.length && product.options.map((option, index) => {
//             return <TableRow key={product.item + '__option_' + index} style={{width: '12em'}} >
//                 <TableRowColumn style={optionsStyles.size} >{option.size} -</TableRowColumn>
//                 <TableRowColumn style={optionsStyles.price} >${option.price}</TableRowColumn>
//                 <TableRowColumn style={optionsStyles.quantity} >
//                     <TextField
//                         defaultValue={option.quantity > 0 ? option.quantity : null}
//                         underlineShow={true}
//                         hintText="#"
//                         type="number"
//                         />
//                 </TableRowColumn>
//             </TableRow>
//         })}
//     </TableBody></Table>}
//     />
//     <CardActions>
//     {/* <FlatButton label="Action1" />
//     <FlatButton label="Action2" /> */}
//     </CardActions>
//     <CardText expandable={true}>
//     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//     Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
//     Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
//     Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
//     </CardText>
// </Card>
// })}