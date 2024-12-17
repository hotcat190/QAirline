import styles from './AdminSchedules.module.css';
import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';

const AdminSchedules = () => {

    const handleAddSchedule = () => {
        console.log('Add new schedule');
    }

    return (
        <div className={styles.schedulesPage}>
            <AdminPageTitle title="Schedules Management" onAdd={handleAddSchedule} label="Add New Schedule" />
        </div>
    )
}


export default AdminSchedules;