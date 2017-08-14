import {
    CURRENT_USER,
    ANONYMOUS,
} from '../../constants';

const defaultUser = {
    role: ANONYMOUS
};

function user(state = defaultUser, action) {
    const { type, user } = action;
    
    if (type === CURRENT_USER && user) {
        return {
            ...state,
            ...action.user
        };
    } else {
        return state;
    }
}

export default user;