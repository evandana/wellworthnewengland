import { connect } from 'react-redux';
import { addUser, loginUser } from '../../../actions';
import Login from '../../view/Login';

const mapStateToProps = (state) => {
    
    return {
        isLoggedIn: !!state.user,
    };
};

const mapDispatchToProps = ({
    addUser,
    loginUser,
});

const LoginController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);

export default LoginController;