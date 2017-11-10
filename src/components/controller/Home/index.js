import { connect } from 'react-redux';
import { openLoginModal, toggleShowDescription, updateQuantity } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        userPermissions: state.user.permissions,
    };
};

const mapDispatchToProps = { openLoginModal, toggleShowDescription, updateQuantity };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;