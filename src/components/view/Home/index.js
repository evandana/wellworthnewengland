import React from 'react';
import { ANONYMOUS, SELLER, CUSTOMER } from 'constants.js';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
    
    const { userRole, openModal } = props;
    
    let defaultView = '';
    
    switch (userRole) {
        case CUSTOMER: 
            defaultView = (
                <Redirect to="/products"/>
            );
            break;
        case SELLER: 
            defaultView = (
                <Redirect to="/admin"/>
            );
            break;
        case ANONYMOUS:
        default:
            defaultView = (
                <div>
                    Welcome to the Well Worth New England site.  
                    Please <span className="fake-link" onClick={openModal}>Login</span> to register as a customer.
                </div>
            );
            break;
    }
    
    return(
        <div className='page'>
           {defaultView}
        </div>
    );
    
}

export default Home;