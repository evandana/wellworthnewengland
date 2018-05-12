import { connect } from 'react-redux';
import AuthorizedRoute from '../../../view/Common/Route';

const mapStateToProps = (state) => ({isLoggedIn: !!state.user});
const AuthorizedRouteController = connect(mapStateToProps)(AuthorizedRoute);

export default AuthorizedRouteController;