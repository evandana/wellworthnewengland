import {
    //AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
    SET_CURRENT_USER,
    
    OPEN_MODAL,
} from '../constants';

/** AUTHENTICATION **/
export function loginGoogleRequest() {
    return { type: LOGIN_GOOGLE_REQUEST };
}

export function setCurrentUser(user) {
    const { displayName, uid } = user;
    return {
        displayName,
        uid,
        type: SET_CURRENT_USER,
    }
}

export function logoutUserRequest() {
    return {
        type: LOGOUT_USER_REQUEST,
    };
}

export function openModal() {
    return {
        type: OPEN_MODAL,
    }
}