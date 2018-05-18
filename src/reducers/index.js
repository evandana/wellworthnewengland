import asyncResponses from './async-responses.js';
import modal from './modal.js';
import orderMetaData from './order-meta-data';
import orders from './orders.js';
import ordersFilterObj from './orders-filter-obj';
import ordersSortObj from './orders-sort-obj';
import products from './products.js';
import signInCodesForm from './sign-in-codes-form';
import user from './user.js';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    asyncResponses,
    isLoggedIn,
    modal,
    orderMetaData,
    orders,
    ordersFilterObj,
    ordersSortObj,
    products,
    signInCodesForm,
    user,
};

export default reducers;
