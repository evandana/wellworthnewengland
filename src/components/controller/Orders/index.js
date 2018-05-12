import { connect } from 'react-redux';
import { toggleOrderDetails, placeOrder, requestUpdateOrder, requestSortOrderTable } from 'actions';
import { Orders } from 'components/view/Orders';

const mapStateToProps = (state) => {

    return {
        orders: state.orders,
        userPermissions: state.user.permissions,
        ordersSortObj: state.ordersSortObj,
    };
};

const mapDispatchToProps = { toggleOrderDetails, placeOrder, requestUpdateOrder, requestSortOrderTable };

const OrdersController = connect(
    mapStateToProps, mapDispatchToProps
)(Orders);

export default OrdersController;