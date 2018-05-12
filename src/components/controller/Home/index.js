import { connect } from 'react-redux';
import { openModal, toggleShowDescription, updateQuantity } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        userPermissions: state.user.permissions,
    };
};

const mapDispatchToProps = { openModal, toggleShowDescription, updateQuantity };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;