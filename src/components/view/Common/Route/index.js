import React from 'react'
import { ADMIN, SELLER } from 'constants.js';
import { Route } from 'react-router-dom';

import NotAuthorized from 'components/view/NotAuthorized';

const AuthorizedRoute = (props) => {

    const { location, userRole, component: Component, ...rest } = props;

    const notAuthProps = {
        from: location
    };

    return (
        <Route {...rest} render={props => (
            userRole === ADMIN || userRole === SELLER ? (
                    <Component {...props}/>
                ) : (
                    <NotAuthorized {...notAuthProps} />
                )
        )}/>
    );
}

export default AuthorizedRoute;
