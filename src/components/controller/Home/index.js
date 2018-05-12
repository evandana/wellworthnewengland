import { connect } from 'react-redux';
import { openLoginModal, toggleExpandRow, updateQuantity } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        userPermissions: state.user.permissions,
    };
};

const mapDispatchToProps = { openLoginModal, toggleExpandRow, updateQuantity };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;