import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const propTypes = {
    autoComplete: PropTypes.string,
    error: PropTypes.bool,
    hint: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    msg: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string,
};

const defaultProps = {
    autoComplete: '',
    error: false,
    hint: '',
    label: '',
    msg: '',
    onBlur: null,
    onChange: null,
    type: 'text',
    value: '',
};

class Input extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: !!props.error || false,
            value: props.value || '',
        };
    }
    
    render() {
        const {
            hint,
            id,
            label,
            msg,
            name,
        } = this.props;
        
        const {
            error,
            value,
        } = this.state;
        
        const inputFields = ['id', 'name', 'onBlur', 'onChange', 'type'];
        
        const labelProps = {
            htmlFor: id,
        };

        const inputProps = { id, name, value };
        inputFields.forEach( (field) => {
            if (this.props[field]) {
                inputProps[field] = this.props[field];
            }
        });

        const fieldClass = error ? '--error' : '';

        const oldHtml = (
            <fieldset className={fieldClass}>
                <label {...labelProps}>{label}</label>
                <input {...inputProps} />
                <div>{msg}</div>
            </fieldset>
        );
        
        return (
            <fieldset>
                <TextField
                    hintText={hint}
                    floatingLabelText={label}
                />
            </fieldset>
        );
    }
    
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;