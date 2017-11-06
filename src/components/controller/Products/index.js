import { connect } from 'react-redux';
import { openModal, toggleShowDescription, updateQuantity } from 'actions';
import Products from 'components/view/Products';

const mapStateToProps = (state) => {

    return {
        products: state.products,
        userRole: state.user.role,
    };
};

const mapDispatchToProps = { openModal, toggleShowDescription, updateQuantity };

const ProductsController = connect(
    mapStateToProps, mapDispatchToProps
)(Products);

export default ProductsController;