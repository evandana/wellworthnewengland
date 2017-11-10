import { fork } from 'redux-saga/effects';
import authentication from './authentication';
import user from './user';
import product from './product';
import order from './order';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(authentication),
        fork(user),
        fork(product),
        fork(order),
    ];
}

export default sagas;