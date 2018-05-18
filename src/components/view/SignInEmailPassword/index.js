import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import muiThemeable from 'material-ui/styles/muiThemeable';

const renderTextField = ({
    input,
    label,
    type,
    name,
    value,
    meta: { touched, error },
    ...custom
}) => (
        <TextField
            floatingLabelText={label}
            errorText={touched && error}
            floatingLabelFixed={false}
            hintText={label}
            type={type}
            {...input}
            {...custom}
        />
    )

class SignInEmailPassword extends Component {

    constructor(props) {
        super(props);
        // this.themePalette = this.props.muiTheme.palette;
        this.state = {
            initialValues: this.props.initialValues
        };
        this.submitForm = this.submitForm.bind(this);
        this.themePalette = this.props.muiTheme.palette;
    }

    signInWithEmailAndPassword ({email, password}) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log('Erro signing in with email and password', errorCode, errorMessage);
            });
    }

    submitForm(formData) {
        // console.log('form', formData);
        const { dispatch, user, codeKey, codePermission } = this.props;

        console.log('submitting form')

        signInWithEmailAndPassword({ 
            email: formData.email, 
            password: formData.password,
        });
    }

    render() {

        const { user, SignInEmailPasswordForm, handleSubmit, submit } = this.props;

        return (
            <form
                onSubmit={handleSubmit(this.submitForm)}
            >
                {SignInEmailPasswordForm && SignInEmailPasswordForm.success === false && 'Try re-entering the branch name and passphrase'}
                <Field
                    name='branchName'
                    type="text"
                    style={{width:'10em'}}
                    component={renderTextField}
                    label='Branch Name'
                />
                &nbsp;
                <Field
                    name='passphrase'
                    type="text"
                    style={{width:'10em'}}
                    component={renderTextField}
                    label='Passphrase'
                />
            </form>
        );
    }
}

export default muiThemeable()(reduxForm({
    form: 'SignInEmailPassword',
})(SignInEmailPassword));