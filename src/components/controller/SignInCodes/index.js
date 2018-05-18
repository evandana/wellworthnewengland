import { connect } from 'react-redux';
import SignInCodes from 'components/view/SignInCodes';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        signInCodesForm: state.signInCodesForm,
    }
};
  
export default connect(
    mapStateToProps
)(SignInCodes);