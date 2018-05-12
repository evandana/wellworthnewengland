import React from 'react';

const NotAuthorizedPage = props => {

    const { from } = props;

    const path = from.pathname;

    return (
        <div className="page">
            You don't have permissions to access {path}. 
            Please try log in as an authorized user or try hacking the system to gain access.
        </div>
    );
};

export default NotAuthorizedPage;