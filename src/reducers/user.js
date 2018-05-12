import {
    SET_CURRENT_USER,
    ANONYMOUS,
    PENDING,
} from '../constants';

const defaultUser = {
    role: ANONYMOUS,
    name: '',
    uid: '',
};

function user(state = defaultUser, action) {
    const { type, ...rest } = action;
    
    if (type === SET_CURRENT_USER) {
        return {
            role: PENDING,
            ...rest,
        };
    } else {
        return state;
    }
}

export default user;