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

    // PRODUCTS,
    GET_PRODUCTS,
    UPDATE_PRODUCTS,

    // ROW EXPANSION
    TOGGLE_SHOW_DESCRIPTION,

    // PRICE UPDATES
    UPDATE_QUANTITY,

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


/** PRODUCTS */
export function getProducts(products) {
    return {
        type: GET_PRODUCTS,
        products: products
    };
}
export function updateProducts(products) {
    console.log('updateProducts action', products);
    return {
        type: UPDATE_PRODUCTS,
        products
    };
}

/** ROW EXPANSION **/
export function toggleShowDescription(row, col) {
    return {
        type: TOGGLE_SHOW_DESCRIPTION,
        row, // 0 is first row
        col, // 0 is first column
    };
} 

/** PRICE UPDATES **/
export function updateQuantity(productId, optionKey, quantity) {
    return {
        type: UPDATE_QUANTITY,
        productId, 
        optionKey, 
        quantity,
    };
} 