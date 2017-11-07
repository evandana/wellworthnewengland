import { connect } from 'react-redux';
import AuthorizedRoute from 'components/view/Common/Route';

const mapStateToProps = (state) => {
    return {
        userPermissions: state.user.permissions,
    }
};

const AuthorizedRouteController = connect(
    mapStateToProps
)(AuthorizedRoute);

export default AuthorizedRouteController;