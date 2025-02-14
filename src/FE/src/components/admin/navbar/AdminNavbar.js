import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AdminNavbar.module.css';

const AdminNavbarItem = ({ icon, title, to }) => {
    return (
        <li>
            <NavLink to={to} className={({ isActive }) => isActive ? styles.active : ''}>
                <div className={styles.cardContent}>
                    <i className={icon}></i>
                    <span>{title}</span>
                </div>
            </NavLink>
        </li>
    )
}

export default function AdminNavbar() {
    return (
        <nav className={styles.adminSidebar}>
            <ul className={styles.sidebarMenu}>
                <AdminNavbarItem icon="fas fa-tachometer-alt" title="Dashboard" to="/admin/dashboard" />
                <AdminNavbarItem icon="fas fa-plane" title="Aircrafts" to="/admin/aircrafts" />
                <AdminNavbarItem icon="fas fa-calendar-alt" title="Schedules" to="/admin/schedules" />
                <AdminNavbarItem icon="fas fa-route" title="Flights" to="/admin/flights" />
                <AdminNavbarItem icon="fas fa-book" title="Bookings" to="/admin/bookings" />
                <AdminNavbarItem icon="fas fa-ad" title="Advertisements" to="/admin/advertisements" />
                <li className={styles.returnHome}>
                    <NavLink to="/" className={styles.homeLink}>
                        <div className={styles.cardContent}>
                            <i className="fas fa-home"></i>
                            <span>Return to Home</span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
