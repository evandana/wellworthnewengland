import React from 'react';
import { Redirect } from 'react-router-dom';
import { Cart } from 'components/view/Common/Cart';
import NotAuthorized from 'components/view/NotAuthorized';


const Products = (props) => {
    
    const { user, location, userPermissions, products, toggleExpandRow, placeOrder, updateQuantity, clearOrderResponses, clearProductQuantities, asyncResponses } = props;

    const cartProps = {
        products,
        toggleExpandRow,
        updateQuantity,
        rowIndexExpanded: 0,
        placeOrder,
        asyncResponses,
        clearOrderResponses,
        clearProductQuantities,
        user,
    };
    
    const notAuthProps = {
        from: location
    };
    
    return(
        <div className='page'>
            <h2>PRODUCTS</h2>
            { userPermissions.products && <Cart {...cartProps} />}
        </div>
    );
    
}

export default Products;