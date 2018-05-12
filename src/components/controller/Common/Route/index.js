import { connect } from 'react-redux';
import AuthorizedRoute from 'components/view/Common/Route';

const mapStateToProps = (state) => {
    return {
        userRole: state.user.role,
    }
};

const AuthorizedRouteController = connect(
    mapStateToProps
)(AuthorizedRoute);

export default AuthorizedRouteController;