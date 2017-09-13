import { connect } from 'react-redux';
import Input from 'components/view/Common/Input';

function mergeProps(stateProps, dispatchProps, ownProps) {
    const {
        validationCheck = () => true,
        updateValue = () => null,
    } = ownProps;
    
    return {
        ...ownProps,
        updateValue,
        validationCheck
    };
}

const InputValidatedController = connect(
    null, null, mergeProps
)(Input);

export default InputValidatedController;