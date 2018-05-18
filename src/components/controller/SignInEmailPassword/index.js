import { connect } from 'react-redux';
import SignInEmailPassword from 'components/view/SignInEmailPassword';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        SignInEmailPasswordForm: state.SignInEmailPasswordForm,
    }
};
  
export default connect(
    mapStateToProps
)(SignInEmailPassword);