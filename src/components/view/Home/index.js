import React from 'react';
import { ANONYMOUS } from '../../../constants';

const Home = ({ userRole, loginUser, openModal }) => {
    
    let greeting = '';
    
    if (userRole === ANONYMOUS) {
        greeting = (
            <div>
                Welcome to the Well Worth New England site.  
                Please <span className="fake-link" onClick={openModal}>Login</span> to register as a customer.
            </div>
        );
    }
    
    return(
        <div className='page'>
            <h2>Welcome</h2>
           {greeting}
        </div>
    );
    
}

export default Home;