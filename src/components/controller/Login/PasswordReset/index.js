import { connect } from 'react-redux';
import { resetPassword } from '../../../../actions';
import PasswordReset from '../../../view/Login/PasswordReset';

const mapDispatchToProps = ({
    resetPassword,
});

const PasswordResetController = connect(
    null,
    mapDispatchToProps,
)(PasswordReset);

export default PasswordResetController;