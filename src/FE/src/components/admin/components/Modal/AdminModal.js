import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './AdminModal.module.css';

export default function AdminModal({ title, onClose, children }) {
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
                {children}
            </div>
        </div>,
        document.getElementById('adminLayout')
    );
}
