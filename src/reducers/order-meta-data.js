import {
    UPDATE_MANAGER,
    UPDATE_BRANCH_NAME,
} from '../constants';

const initialState = {
    manager: '',
    branchName: ''
};

function orderMetaData(state = initialState, action) {
    const { type, inputValue } = action;

    if (type === UPDATE_MANAGER) {

        return Object.assign({}, state, {
            manager: inputValue
        });
    } else if (type === UPDATE_BRANCH_NAME) {

        return Object.assign({}, state, {
            branchName: inputValue
        });
    } else {
        return state;
    }
}

export default orderMetaData;
