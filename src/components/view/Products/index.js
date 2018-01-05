import React from 'react';
import { Redirect } from 'react-router-dom';
import { Cart } from 'components/view/Common/Cart';


const Products = (props) => {
    
    const { user, location, userPermissions, products, orderMetaData, updateManager, updateBranchName, toggleExpandAllRows, placeOrder, updateQuantity, clearOrderResponses, clearProductQuantities, asyncResponses } = props;

    const cartProps = {
        products,
        toggleExpandAllRows,
        updateQuantity,
        rowIndexExpanded: 0,
        placeOrder,
        asyncResponses,
        clearOrderResponses,
        clearProductQuantities,
        orderMetaData,
        updateManager, 
        updateBranchName,
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