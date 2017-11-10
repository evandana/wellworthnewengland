import {
    PLACE_ORDER_RESPONSE,
    CLEAR_ORDER_RESPONSES,
} from '../constants';

const initialState = {
    placeOrderResponses: [],
};

function asyncResponses(state = initialState, action) {
    const { type, response } = action;

    if (type === PLACE_ORDER_RESPONSE) {

        return Object.assign({}, state, {
            placeOrderResponses: [response, ...state.placeOrderResponses]
        });

    } if (type === CLEAR_ORDER_RESPONSES) {

        return Object.assign({}, state, {
            placeOrderResponses: []
        });

    } else {
        return state;
    }
}

export default asyncResponses;