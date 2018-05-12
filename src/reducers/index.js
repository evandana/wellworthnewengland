import modal from './modal.js';
import user from './user.js';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    modal,
    user,
};

export default reducers;
