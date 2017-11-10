import { connect } from 'react-redux';
import { toggleOrderDetails, placeOrder, requestUpdateOrder } from 'actions';
import { Orders } from 'components/view/Orders';

const mapStateToProps = (state) => {

    return {
        orders: state.orders,
        userPermissions: state.user.permissions,
    };
};

const mapDispatchToProps = { toggleOrderDetails, placeOrder, requestUpdateOrder };

const OrdersController = connect(
    mapStateToProps, mapDispatchToProps
)(Orders);

export default OrdersController;