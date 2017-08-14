import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    autoComplete: PropTypes.string,
    error: PropTypes.bool,
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
    label: '',
    msg: '',
    onBlur: null,
    onChange: null,
    type: 'text',
    value: '',
};

const Input = props => {
    const {
        error,
        id,
        label,
        msg,
        ...rest
    } = props;
    
    const labelProps = {
        htmlFor: id,
    };
    
    const inputProps = {
        id,
        ...rest,
    };
    
    const fieldClass = error ? '--error' : '';
    
    return (
        <fieldset className={fieldClass}>
            <label {...labelProps}>{label}</label>
            <input {...inputProps} />
            <div>{msg}</div>
        </fieldset>
    );
};

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;