import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Common/Input';

const canSubmit = (state) => {
    const { emailInput, passwordInput } = state;
    
    return (emailInput.value && emailInput.value.length)
        && (passwordInput.value && passwordInput.value.length);
};

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setLoginType = this.setLoginType.bind(this);
        const emailInput = {
            autoComplete: 'email',
            id: 'userEmail',
            name: 'email',
            type: 'email',
            value: '',
            onChange: this.handleInputChange,
            label: 'Email',
        };
        const passwordInput = {
            autoComplete: 'password',
            id: 'userPassword',
            name: 'password',
            type: 'text',
            value: '',
            onChange: this.handleInputChange,
            label: 'Password',
        };
        this.state = {
            canSubmit: false,
            emailInput,
            passwordInput,
            loginType: 'login',
            submitText: 'Login',
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
        
        const { emailInput, passwordInput } = this.state;
        
        const validationState = {
            emailInput,
            passwordInput,
        };
        
        validationState[inputName] = updatedInput;
        
        this.setState({
            [inputName]: updatedInput,
            canSubmit: canSubmit(validationState),
        });
    }
    
    handleSubmit(e) {
        const { emailInput, loginType, passwordInput } = this.state;
        const { addUser, loginUser } = this.props;
        
        e.preventDefault();
        
        if(loginType === 'signup') {
            addUser({
                email: emailInput.value,
                password: passwordInput.value,
            });
        } else {
            loginUser({
                email: emailInput.value,
                password: passwordInput.value,
            });
        }
    }
    
    setLoginType(e) {
        const { loginType } = this.state;
        
        this.setState({
            loginType: loginType === 'signup' ? 'login' : 'signup',
            submitText: loginType === 'signup' ? 'Login' : 'Signup',
        });
    }
    
    render() {
        const { isLoggedIn } = this.props;
        const { canSubmit, emailInput, loginType, passwordInput, submitText } = this.state;
        const msg = isLoggedIn ? 'Logged In' : 'Not Logged In';
        
        const submitButton = {
            className: 'login__submit-btn',
            disabled: !canSubmit,
            onClick: this.handleSubmit,
        };

        let loginPrompt;
        let registerPrompt;
        
        if (loginType === 'signup') {
            loginPrompt = <span className="login__link" onClick={this.setLoginType}>Login</span>;
            registerPrompt = <h2>New User Signup</h2>;
        } else {
            registerPrompt = <span className="login__link" onClick={this.setLoginType}>New User Signup</span>;
            loginPrompt = <h2>Login</h2>;
        }
        
        return (
            <div className="page">
                <h2>Login Page</h2>
                <p>Status: {msg}</p>
                
                <div className="login__toggle">
                    {loginPrompt}
                    {registerPrompt}
                </div>
                
                <div className="login__form">

                    <form className="login__form-fields">
                        <Input {...emailInput} />
                        <Input {...passwordInput} />
                        
                        <div className="login__submit">
                            <button {...submitButton}>{submitText}</button>
                        </div>
                    </form>
                    
                    <div className="login__actions">

                        <span><Link to="/reset-password">Reset your Password</Link></span>

                    </div>

                </div>
            </div>
        );
    }
    

}

export default Login;