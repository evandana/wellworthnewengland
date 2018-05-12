/** REACT **/
import React, { Component } from 'react';
/** MATERIAL UI **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
/** ROUTER **/
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
/** REDUX **/
import { Provider } from 'react-redux';
/** FIREBASE **/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
/** APP **/
import config from 'config';
import AuthorizedRoute from './components/controller/Common/Route';
import Authorized from './components/view/Authorized';
import Home from './components/controller/Home';
import Navigation from './components/controller/Common/Navigation';
import AppModal from './components/controller/Common/Modal';
import { getUser } from './actions';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
    
    constructor(props) {
        super(props);

        /** Firebase Setup **/
        window._FIREBASE_ = firebase.initializeApp(config.firebase);
        window._FIREBASE_PROVIDER_ = new firebase.auth.GoogleAuthProvider();
        window._FIREBASE_DB_ = firebase.database();
        window._FIREBASE_.auth().onAuthStateChanged(
            (user) => {
                if(user && user.uid) {
                    const userData = {
                        uid: user.uid,
                        displayName: user.displayName,
                    };
                    window._UI_STORE_.dispatch(getUser(user.uid, userData));
                }
            }
        );
    }
    
    render() {
        const { store, history } = this.props;
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div className="app">
                            <Navigation />
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <AuthorizedRoute path="/authorized" component={Authorized} />
                            </Switch>
                            <AppModal />
                        </div>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
