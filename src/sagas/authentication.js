import { takeEvery } from 'redux-saga/effects';

import { 
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,
} from 'constants.js';

function* loginGoogleRequest() {

    window._FIREBASE_.auth().signInWithPopup(window._FIREBASE_PROVIDER_).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        
    }).catch(function(error) {
        console.log('ERROR with Google Login', error)
    });

}

function* logoutUserRequest() {
    window._FIREBASE_.auth().signOut()
        .then( () => {window.location.reload(true);} );
}

export default function* () {
    yield [
        takeEvery(LOGIN_GOOGLE_REQUEST, loginGoogleRequest),
        takeEvery(LOGOUT_USER_REQUEST, logoutUserRequest)
    ];
}