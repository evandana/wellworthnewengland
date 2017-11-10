import { connect } from 'react-redux';
import { toggleOrderDetails, placeOrder } from 'actions';
import { Orders } from 'components/view/Orders';

const mapStateToProps = (state) => {

    return {
        orders: state.orders,
        userPermissions: state.user.permissions,
    };
};

const mapDispatchToProps = { toggleOrderDetails, placeOrder };

const OrdersController = connect(
    mapStateToProps, mapDispatchToProps
)(Orders);

export default OrdersController;