import { connect } from 'react-redux';
import { toggleExpandAllRows, placeOrder, clearOrderResponses, clearProductQuantities, updateQuantity, updateManager, updateBranchName } from 'actions';
import Products from 'components/view/Products';

const mapStateToProps = (state) => {

    return {
        products: state.products,
        userPermissions: state.user.permissions,
        asyncResponses: state.asyncResponses,
        user: state.user,
        orderMetaData: state.orderMetaData,
    };
};

const mapDispatchToProps = { toggleExpandAllRows, placeOrder, clearOrderResponses, clearProductQuantities, updateQuantity, updateManager, updateBranchName };

const ProductsController = connect(
    mapStateToProps, mapDispatchToProps
)(Products);

export default ProductsController;