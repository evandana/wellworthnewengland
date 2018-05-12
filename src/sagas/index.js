import { fork } from 'redux-saga/effects';
import authentication from './authentication';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(authentication),
    ];
}

export default sagas;