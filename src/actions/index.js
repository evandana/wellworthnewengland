import {
    // AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
    
    // USER
    GET_USER,
    UPDATE_USER,
    SET_CURRENT_USER,    

    // MODALS
    OPEN_MODAL,
} from '../constants';

/** AUTHENTICATION **/
export function loginGoogleRequest() {
    return { type: LOGIN_GOOGLE_REQUEST };
}

export function setCurrentUser(user) {
    const { displayName, role, uid } = user;
    return {
        displayName,
        role,
        uid,
        type: SET_CURRENT_USER,
    };
}

export function logoutUserRequest() {
    return {
        type: LOGOUT_USER_REQUEST,
    };
}

/** USER **/
export function getUser(uid, userData=null) {
    return {
        uid,
        userData,
        type: GET_USER,
    };
}

export function updateUser(userData) {
    return {
        userData,
        type: UPDATE_USER
    };
}

export function openModal() {
    return {
        type: OPEN_MODAL,
    };
}