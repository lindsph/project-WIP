import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
    return (
        <div className={styles['error-page']}>
            <h1>404</h1>
            <p>We can't find that page</p>
            <Link to="/">Home</Link>
        </div>
    );
};

export default ErrorPage;