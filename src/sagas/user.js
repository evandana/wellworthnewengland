import { select, takeEvery } from 'redux-saga/effects';

import {
    GET_USER,
    UPDATE_USER,
} from 'constants.js';

import { setCurrentUser, updateUser as updateUserAction, getProducts, getOrders, } from 'actions';

function* getUser({uid, userData}) {
    window._FIREBASE_DB_.ref('/users/' + uid)
        .on('value', (snapshot) => {
            const user = snapshot.val();
            
            if (!user) {
                window._UI_STORE_.dispatch(updateUserAction({...userData, permissions: {basic: true}}));
            } else {
                window._UI_STORE_.dispatch(setCurrentUser(user));
            }
        });
    
    yield;
}

function* updateUser({userData}) {
    const currentUser = yield select(state => state.user);
    let cleanUser = {};

    if(!currentUser || !currentUser.uid) {
        cleanUser = {
            uid: userData.uid,
            permissions: userData.permissions,
            provider: userData.provider,
        };
        if (userData.displayName) {
            cleanUser.displayName = userData.displayName;
        }
        if (userData.email) {
            cleanUser.email = userData.email;
        }
    } else {
        cleanUser = {...currentUser, ...userData};
    }

    if (cleanUser.authInitiated) {
        delete cleanUser.authInitiated;
    }
    
    window._FIREBASE_DB_.ref('users/' + cleanUser.uid)
        .set(cleanUser)
        .then( user => {

                // Make requests for data, in case it's relevant
                // Trust DB to only share accessible data

                // TODO: only load this on the products route
                window._UI_STORE_.dispatch(getProducts());
                
                // TODO: only load this on the admin route
                window._UI_STORE_.dispatch(getOrders());
        });
    
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_USER, getUser),
        takeEvery(UPDATE_USER, updateUser),
    ];
}