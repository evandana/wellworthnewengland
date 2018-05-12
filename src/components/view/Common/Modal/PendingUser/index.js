import React, { Component } from 'react';
import InputController from 'components/controller/Common/Forms/InputValidated';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './styles.css';

class PendingUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validInput: false,
        }
    }
    
    render() {
        const { logoutUserRequest, userName } = this.props;
        const { validInput } = this.state;
        
        const inputProps = {
            hint: 'Enter Customer Key Here',
            id: 'customerKey',
            name: 'customerKey',
            label: 'Customer Key',
        };
        
        const keyButtonProps = {
            disabled: !validInput,
            label: 'Submit Key',
            primary: true,
        };
        
        const logoutButtonProps = {
            label: 'Logout',
            onClick: logoutUserRequest,
        };

        return (
            <div>
                <div className="pendingUser__auth-status">
                    <span>Logged in as: {userName}</span>
                    <FlatButton {...logoutButtonProps} />
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