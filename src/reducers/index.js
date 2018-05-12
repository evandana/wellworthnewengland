import modal from './modal.js';
import user from './user.js';
import products from './products.js';
import orders from './orders.js';
import asyncResponses from './async-responses.js';
import ordersSortObj from './orders-sort-obj';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    modal,
    user,
    products,
    orders,
    asyncResponses,
    ordersSortObj,
};

export default reducers;
