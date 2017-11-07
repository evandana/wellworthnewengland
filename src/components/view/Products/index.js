import React from 'react';
import { Redirect } from 'react-router-dom';
import Cart from 'components/view/Common/Cart';
import NotAuthorized from 'components/view/NotAuthorized';


const Products = (props) => {
    
    const { location, userPermissions, openModal, products, toggleShowDescription, updateQuantity } = props;

    const cartProps = {
        products,
        toggleShowDescription,
        updateQuantity,
        rowIndexExpanded: 0
    };
    
    const notAuthProps = {
        from: location
    };
    
    return(
        <div className='page'>
            <h2>PRODUCTS</h2>
            { userPermissions.products ? 
                <Cart {...cartProps} /> :
                <NotAuthorized {...notAuthProps} /> 
            }
        </div>
    );
    
}

export default Products;