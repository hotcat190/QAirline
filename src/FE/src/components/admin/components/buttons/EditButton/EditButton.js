import { FaEdit } from 'react-icons/fa';
import styles from './EditButton.module.css';
import stylesCommon from '../button-common.module.css';

export default function EditButton({ onEdit }) {
    return (
        <button className={`${stylesCommon.actionButton} ${styles.editButton}`} onClick={onEdit}>
            <FaEdit /> Edit
        </button>
    );
}