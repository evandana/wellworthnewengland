import { connect } from 'react-redux';
import { logoutUserRequest, updateUser } from 'actions';
import { CUSTOMER } from 'constants.js';
import PendingUser from 'components/view/Common/Modal/PendingUser';

const mapStateToProps = (state) => {
    const user = state.user;
    
    return {
        userName: user.displayName,
    };
};

const mapDispatchActions = {
    logoutUserRequest,
    updateUserRole: () => updateUser({role: CUSTOMER}),
};

const PendingUserController = connect(
    mapStateToProps, mapDispatchActions
)(PendingUser);

export default PendingUserController;