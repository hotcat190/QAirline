import { NavLink } from 'react-router-dom';
import './AdminNavbar.css';

export default function AdminNavbar() {
    return (
        <nav className="admin-sidebar">
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/aircrafts" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-plane"></i>
                        <span>Aircrafts</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/flights" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-route"></i>
                        <span>Flights</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/advertisements" className={({ isActive }) => isActive ? 'active' : ''}>
                        <i className="fas fa-ad"></i>
                        <span>Advertisements</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
