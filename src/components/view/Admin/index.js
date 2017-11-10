import React from 'react';
import Orders from 'components/controller/Orders';

const AdminPage = props => {

    return (
        <div className="page">
            <h2>Admin View</h2>
            <Orders {...props} />
        </div>
    );
};

export default AdminPage;