import { connect } from 'react-redux';
import { logoutUserRequest } from 'actions';
import PendingUser from 'components/view/Common/Modal/PendingUser';

const mapStateToProps = (state) => {
    const user = state.user;
    return {
        userName: user.displayName,
    };
};

const mapDispatchActions = {
    logoutUserRequest,
};

const PendingUserController = connect(
    mapStateToProps, mapDispatchActions
)(PendingUser);

export default PendingUserController;