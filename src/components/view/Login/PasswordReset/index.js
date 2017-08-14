import React, { Component } from 'react';
import Input from '../../Common/Input';

const canSubmit = (state) => {
    const { emailInput } = state;

    return (emailInput.value && emailInput.value.length);
};

class PasswordReset extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setResetType = this.setResetType.bind(this);
        const emailInput = {
            autoComplete: 'email',
            id: 'userEmail',
            name: 'email',
            type: 'email',
            value: '',
            onChange: this.handleInputChange,
            label: 'Email',
        };
        this.state = {
            canSubmit: false,
            emailInput,
            resetType: 'reset',
            submitText: 'Reset Password',
        };
    }

    handleInputChange(e) {
        const { name, value } = e.target;
        const inputName = `${name}Input`;
        const isValid = !!(value && value.length);

        const updatedInput = {
            ...this.state[inputName],
            value,
            error: !isValid,
            msg: !isValid ? 'Required Field' : '',
        };

        const { emailInput } = this.state;

        const validationState = {
            emailInput
        };

        validationState[inputName] = updatedInput;

        this.setState({
            [inputName]: updatedInput,
            canSubmit: canSubmit(validationState),
        });
    }

    handleSubmit(e) {
        const { emailInput, resetType } = this.state;
        const { resetPassword } = this.props;

        e.preventDefault();

        resetPassword({email: emailInput.value});
    }

    setResetType(e) {
        const { resetType } = this.state;

        this.setState({
            resetType: resetType === 'reset' ? 'reset' : 'confirm',
            submitText: resetType === 'reset' ? 'Reset Password' : 'Confirm',
        });
    }

    render() {
        const { canSubmit, emailInput, resetType, submitText } = this.state;
        const submitButton = {
            className: 'login__submit-btn',
            disabled: !canSubmit,
            onClick: this.handleSubmit,
        };

        return (
            <div className="page">
                <h2>Password Reset Page</h2>

                <div className="login__toggle">
                    <h2>Reset Password</h2>
                </div>

                <div className="login__form">

                    <form className="login__form-fields">
                        <Input {...emailInput} />

                        <div className="login__submit">
                            <button {...submitButton}>{submitText}</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }


}

export default PasswordReset;