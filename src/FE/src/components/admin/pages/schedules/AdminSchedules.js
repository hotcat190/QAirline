import styles from './AdminSchedules.module.css';
import Heading from '../../components/heading/Heading';

const AdminSchedules = () => {

    const handleAddSchedule = () => {
        console.log('Add new schedule');
    }

    return (
        <div className={styles.schedulesPage}>
            <Heading title="Schedules Management" onAdd={handleAddSchedule} label="Add New Schedule" />
        </div>
    )
}


export default AdminSchedules;