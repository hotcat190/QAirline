import styles from './Heading.module.css';

import AddButton from '../buttons/AddButton/AddButton';

export default function Heading({ title, onAdd, label }) {
    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            {onAdd && <AddButton onAdd={onAdd} label={label} />}
        </div>
    )
}
