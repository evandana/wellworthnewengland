import modal from './modal.js';
import user from './user.js';
import products from './products.js';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    modal,
    user,
    products,
};

export default reducers;
