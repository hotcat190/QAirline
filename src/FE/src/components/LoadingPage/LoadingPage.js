import React from 'react';
import styles from './LoadingPage.module.css';
import LoadingSpinner from './LoadingSpinner';

const LoadingPage = () => {
    return (
        <div className={styles.loadingContainer}>
            <LoadingSpinner />
            <p className={styles.loadingText}>Loading...</p>
        </div>
    );
};

export default LoadingPage;
