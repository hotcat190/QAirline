import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './AdminModal.module.css';

export default function AdminModal({ title, onClose, handleSubmit, submitLabel, children }) {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 250);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return createPortal(
        <div 
            className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`}
            onClick={handleOverlayClick}
        >
            <div className={`${styles.modal} ${isClosing ? styles.closing : ''}`}>
                <h2>{title}</h2>
                
                <form onSubmit={handleSubmit}>
                    {children}
                    <div className={styles.modalActions}>
                        <button type="button" onClick={handleClose}>Cancel</button>
                        <button type="submit">{submitLabel ? submitLabel : `Submit`}</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('adminLayout')
    );
}
