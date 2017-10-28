import { fork } from 'redux-saga/effects';
import authentication from './authentication';
import user from './user';
import product from './product';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(authentication),
        fork(user),
        fork(product),
    ];
}

export default sagas;