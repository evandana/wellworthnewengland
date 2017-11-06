import React from 'react';
import { ANONYMOUS } from 'constants.js';
import Cart from 'components/view/Common/Cart';

const Products = (props) => {
    
    const { userRole, openModal, products, toggleShowDescription, updateQuantity } = props;

    const cartProps = {
        products,
        toggleShowDescription,
        updateQuantity,
        rowIndexExpanded: 0
    };
    
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
            <h2>PRODUCTS</h2>
           {greeting}
           <Cart {...cartProps} />
        </div>
    );
    
}

export default Products;