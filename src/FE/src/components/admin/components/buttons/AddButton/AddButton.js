import { FaPlus } from 'react-icons/fa';
import styles from './AddButton.module.css';

export default function AddButton({ 
    onAdd,
    label
 }) {
    return (
        <button className={`${styles.addButton}`} onClick={onAdd}>
            <FaPlus /> <span className={styles.buttonText}>{label}</span>
        </button>
    )
}
