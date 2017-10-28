import { connect } from 'react-redux';
import { logoutUserRequest, openModal } from '../../../../actions';
import Navigation from '../../../view/Common/Navigation';

const mapStateToProps = (state) => {

    return {
        user: state.user,
        userRole: state.user.role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {dispatch(logoutUserRequest())},
        openModal: (data) => {
            dispatch(openModal());
        }
    }

};

const NavigationController = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Navigation);

export default NavigationController;