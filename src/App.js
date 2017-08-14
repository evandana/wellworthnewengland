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
/** APP **/
import AuthorizedRoute from './components/controller/Common/Route';
import Authorized from './components/view/Authorized';
import Home from './components/controller/Home';
import Login from './components/controller/Login';
import PasswordReset from './components/controller/Login/PasswordReset';
import Navigation from './components/controller/Common/Navigation';
import AppModal from './components/controller/Common/Modal';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
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
                                <Route path="/login" component={Login} />
                                <AuthorizedRoute path="/authorized" component={Authorized} />
                                <Route path="/reset-password" component={PasswordReset} />
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
