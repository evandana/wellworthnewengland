import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import muiThemeable from 'material-ui/styles/muiThemeable';

import { submitSignInCodes } from 'actions';

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

class SignInCodes extends Component {

    constructor(props) {
        super(props);
        // this.themePalette = this.props.muiTheme.palette;
        this.state = {
            initialValues: this.props.initialValues
        };
        this.submitForm = this.submitForm.bind(this);
        this.themePalette = this.props.muiTheme.palette;
    }

    submitForm(formData) {
        // console.log('form', formData);
        const { dispatch, user, codeKey, codePermission } = this.props;

        console.log('submitting form')

        dispatch(submitSignInCodes({ formData, user, codeKey, codePermission }));
    }

    render() {

        const { user, signInCodesForm, handleSubmit, submit } = this.props;

        return (
            <form
                onSubmit={handleSubmit(this.submitForm)}
            >
                {signInCodesForm && signInCodesForm.success === false && 'Try re-entering the branch name and passphrase'}
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
    form: 'signInCodes',
})(SignInCodes));