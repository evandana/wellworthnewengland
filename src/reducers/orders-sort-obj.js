import {
    REQUEST_SORT_ORDER_TABLE,
} from '../constants';

const initialState = {
    col: 'timestamp',
    dir: 1,
};

function orders(state = initialState, action) {
    const { type, col } = action;

    if (type === REQUEST_SORT_ORDER_TABLE) {

        if (state.col === col) {
            state.dir = ( state.dir + 1 ) % 3;
        } else {
            state = {
                col,
                dir: 1,
            }
        }

        if (state.col === '' || state.dir === 0) {
            state = {
                col: 'timestamp',
                dir: 1,
            }
        }

        return Object.assign({}, state);
    } else {
        return state;
    }
}

export default orders;