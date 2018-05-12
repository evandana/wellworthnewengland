import { connect } from 'react-redux';
import { openLoginModal, toggleExpandRow, updateQuantity, updateManager, updateBranchName } from 'actions';
import Home from 'components/view/Home';

const mapStateToProps = (state) => {
    return {
        products: state.products,
        userPermissions: state.user.permissions,
        orderMetaData: state.orderMetaData,
    };
};

const mapDispatchToProps = { openLoginModal, toggleExpandRow, updateQuantity, updateManager, updateBranchName };

const HomeController = connect(
    mapStateToProps, mapDispatchToProps
)(Home);

export default HomeController;