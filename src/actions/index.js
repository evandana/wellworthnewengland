import { 
    ADD_USER,
    CURRENT_USER,
    LOGOUT_USER,
    LOGIN_USER,
    PASSWORD_RESET,
    
    OPEN_MODAL,
} from '../constants';

export function addUser({ email, password }) {
    return {
        type: ADD_USER,
        email,
        password,
    };
}

export function loginUser({ email, password }) {
    return {
        type: LOGIN_USER,
        email,
        password,
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
    };
}

export function setCurrentUser(user) {
    return {
        type: CURRENT_USER,
        user
    };
}

export function resetPassword({email}) {
    return {
        type: PASSWORD_RESET,
        email
    };
}

export function openModal() {
    console.log('open modal called');
    return {
        type: OPEN_MODAL,
    }
}