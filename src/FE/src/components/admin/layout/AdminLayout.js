import './AdminLayout.css';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../navbar/AdminNavbar';

export default function AdminLayout() {
    return (
        <div className="admin-layout">
            <div className="admin-navbar">
                <AdminNavbar />
            </div>
            <div className="admin-content">
                <Outlet />
            </div>
        </div>
    )
}
