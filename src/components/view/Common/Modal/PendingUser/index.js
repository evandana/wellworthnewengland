import React, { Component } from 'react';
import InputController from 'components/controller/Common/Forms/InputValidated';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './styles.css';

class PendingUser extends Component {

    constructor(props) {
        super(props);
        this.validationCheck = this.validationCheck.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.inputValue = '';
        this.state = {
            validInput: false,
            errorText: '',
        }
    }
    
    validationCheck(val) {
        this.setState({validInput: !!val});
        if (!!val) {
            this.inputValue = val;
        }
    }
    
    onSubmit() {
        const superSecretKey = "enterprise07";
        const { updateUserPermissions } = this.props;
        if (this.inputValue.toLowerCase() === superSecretKey) {
            updateUserPermissions();
        } else {
            this.setState({
                errorText: 'Please enter a valid customer key',
            });
        }
    }
    
    render() {
        const { logoutUserRequest, userName } = this.props;
        const { validInput, errorText } = this.state;
        
        const inputProps = {
            errorText,
            hint: 'Enter Customer Key Here',
            id: 'customerKey',
            name: 'customerKey',
            label: 'Customer Key',
            validationCheck: this.validationCheck,
        };
        
        const keyButtonProps = {
            disabled: !validInput,
            label: 'Submit Key',
            onClick: this.onSubmit,
            primary: true,
        };
        
        const logoutButtonProps = {
            label: 'Logout',
            onClick: logoutUserRequest,
        };

        return (
            <div >
                <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #ddd', paddingBottom:'0.5em' }} >
                    <span>Logged in as: <span style={{fontStyle: 'oblique'}}>{userName || 'Anonymous'}</span></span>
                    <FlatButton
                        {...logoutButtonProps} 
                        />
                </div>
                <div className="pendingUser__key-form">
                    <span>If you have a customer key please enter it below</span>
                    <div className="pendingUser__input-row">
                        <div className="pendingUser___key-input">
                            <InputController {...inputProps} />
                        </div>
                        <div className="pendingUser___key-btn">
                            <RaisedButton {...keyButtonProps} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default PendingUser;