import {
    REQUEST_FILTER_ORDER_TABLE,
} from '../constants';

const initialState = {
    col: '',
    vals: []
};

function ordersFilterObj(state = initialState, action) {
    const { type, col, vals } = action;

    if (type === REQUEST_FILTER_ORDER_TABLE) {

        state = {
            col,
            vals,
        }

        if (state.col === '') {
            state = {
                col: '',
                vals: []
            }
        }
        
        if (state.vals && state.vals.length > 0 && state.vals[0] === 'clear') {
            state = {
                col,
                vals: []
            }
        }

        return Object.assign({}, state);
    } else {
        return state;
    }
}

export default ordersFilterObj;