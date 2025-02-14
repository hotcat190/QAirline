import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = ({ error }) => {
    return (
        <div className={styles.error}>
            <h1>{/*{error.code} - */}{error.title}</h1>
            <p>{error.message}</p>
            <Link to="/" className={styles.homeLink}>
                Return to Homepage
            </Link>
        </div>
    );
};

export default ErrorPage;