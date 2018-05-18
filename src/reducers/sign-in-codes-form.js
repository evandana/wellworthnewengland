import {
    SIGN_IN_CODES_FORM_STATUS_UPDATE,
} from '../constants';

const initialState = {};

function signInCodesForm(state = initialState, action) {
    const { type, statusObj} = action;

    if (type === SIGN_IN_CODES_FORM_STATUS_UPDATE) {
        return {
            ...state,
            ...statusObj
        };
    } else {
        return initialState;
    }
}

export default signInCodesForm;