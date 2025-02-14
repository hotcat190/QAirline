import { FaTrash } from 'react-icons/fa';
import styles from './DeleteButton.module.css';
import stylesCommon from '../button-common.module.css';


export default function DeleteButton({ onDelete }) {
    return (
        <button className={`${stylesCommon.actionButton} ${styles.deleteButton}`} onClick={onDelete}>
            <FaTrash /> Delete
        </button>
    );
}