import { connect } from 'react-redux';
import { toggleOrderDetails, placeOrder, requestUpdateOrder, requestSortOrderTable, requestFilterOrderTable } from 'actions';
import { Orders } from 'components/view/Orders';

const mapStateToProps = (state) => {

    return {
        orders: state.orders,
        userPermissions: state.user.permissions,
        ordersSortObj: state.ordersSortObj,
        ordersFilterObj: state.ordersFilterObj,
        users: state.users,
    };
};

const mapDispatchToProps = { toggleOrderDetails, placeOrder, requestUpdateOrder, requestSortOrderTable, requestFilterOrderTable };

const OrdersController = connect(
    mapStateToProps, mapDispatchToProps
)(Orders);

export default OrdersController;