import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class ControlledTextField extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            quantity: '',
        };
    }
    
    render() {

        let {quantity, optionKey, productItem, updateQuantity} = this.props;

        return (
            <TextField
                id={'textField-'+optionKey}
                value={this.state.quantity}
                underlineShow={true}
                inputStyle={{background:'#fafafa', margin: '12px 0', height: '24px', paddingLeft: '4px'}}
                hintStyle={{color: '#999', zIndex: 2, paddingLeft: '4px'}}
                style={{width:'3em'}}
                underlineStyle={{bottom: '12px'}}
                hintText={'#'}
                type='number'
                onChange={(evt, newQuantity) => {
                    this.setState({quantity: newQuantity});
                    updateQuantity(productItem, optionKey, newQuantity);
                }}
                />
        )
    }

};

export default ControlledTextField;