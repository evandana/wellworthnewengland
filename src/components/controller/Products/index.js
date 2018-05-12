import { connect } from 'react-redux';
import { toggleShowDescription, placeOrder, clearOrderResponses, clearProductQuantities, updateQuantity } from 'actions';
import Products from 'components/view/Products';

const mapStateToProps = (state) => {

    return {
        products: state.products,
        userPermissions: state.user.permissions,
        asyncResponses: state.asyncResponses,
        user: state.user,
    };
};

const mapDispatchToProps = { toggleShowDescription, placeOrder, clearOrderResponses, clearProductQuantities, updateQuantity };

const ProductsController = connect(
    mapStateToProps, mapDispatchToProps
)(Products);

export default ProductsController;