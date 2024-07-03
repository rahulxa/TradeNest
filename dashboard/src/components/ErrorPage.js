import React from 'react';

function ErrorPage() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
                <h1 className="display-4">Access Denied</h1>
                <p className="lead">You are not authorized to access this page.</p>
                <p>Please make sure you are logged in before accessing the page .</p>
                <a href="/" className="btn btn-primary mt-4">Go to Homepage</a>
            </div>
        </div>
    );
}

export default ErrorPage;
