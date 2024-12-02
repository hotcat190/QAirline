import { NavLink } from 'react-router-dom';
import styles from './AdminNavbar.module.css';

export default function AdminNavbar() {
    return (
        <nav className={styles.adminSidebar}>
            <ul className={styles.sidebarMenu}>
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>
                        <div className={styles.cardContent}>
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/aircrafts" className={({ isActive }) => isActive ? styles.active : ''}>
                        <div className={styles.cardContent}>
                            <i className="fas fa-plane"></i>
                            <span>Aircrafts</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/flights" className={({ isActive }) => isActive ? styles.active : ''}>
                        <div className={styles.cardContent}>
                            <i className="fas fa-route"></i>
                            <span>Flights</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? styles.active : ''}>
                        <div className={styles.cardContent}>
                            <i className="fas fa-ticket-alt"></i>
                            <span>Bookings</span>
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/advertisements" className={({ isActive }) => isActive ? styles.active : ''}>
                        <div className={styles.cardContent}>
                            <i className="fas fa-ad"></i>
                            <span>Advertisements</span>
                        </div>
                    </NavLink>
                </li>
                
            </ul>
        </nav>
    )
}
