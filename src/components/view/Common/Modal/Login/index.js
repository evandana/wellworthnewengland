import React from 'react';
import firebase from 'firebase/app';

import RaisedButton from 'material-ui/RaisedButton';

import SignInCodes from 'components/controller/SignInCodes'

import googleLoginImg from '../../../../../static/images/google_signin/btn_google_signin_light_normal_web.png';
import './styles.css';

const LoginModal = (props) => {
    const { loginGoogleRequest } = props;
    
    const googleLoginProps = {
        className: "loginModal-btn",
        onClick: loginGoogleRequest,
        src: googleLoginImg,
    }

    const flexCenter = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }


    function signInAnonymously() {
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log('anonymous sign in error')
            // ...
        });
    }
    
    return (
        <div>
            <div style={{margin:'2em 0'}}>Customers must sign in to access the store.</div>
            
            <div className="row" style={flexCenter}>

                <div className="loginModal-menu col-xs-12 col-md-5" style={flexCenter}>
                    <img {...googleLoginProps} alt="" />
                </div>

                <div className="col-xs-12 col-md-2" style={{ width: '3em', ...flexCenter }}>
                    &mdash; or &mdash;
                </div>

                <div 
                    className="col-xs-12 col-md-5"
                    style={flexCenter}
                    >
                    <RaisedButton
                        primary={true}
                        style={{margin:'1em'}}
                        label="Sign in Anonymously"
                        onClick={signInAnonymously}
                        />
                </div>

                {/* <div className="col-xs-12 col-md-2" style={{ width: '3em', ...flexCenter }}>
                    &mdash; or &mdash;
                </div>

                <div 
                    className="col-xs-12 col-md-6"
                    style={{marginBottom:'25px', ...flexCenter}}
                    >
                    <SignInCodes />
                </div> */}
            </div>


        </div>
    );
};

export default LoginModal;