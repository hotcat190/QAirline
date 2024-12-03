import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../navbar/AdminNavbar';
import MobileHeader from 'components/Header/MobileHeader';
import Header from 'components/Header/Header';

import styles from './AdminLayout.module.css';
import './AdminHeader.css';

const AdminHeader = () => {
    return (
        <>
            <div className="adminHeader">
                <MobileHeader />
                <Header />
            </div>
        </>
    )
}

export default function AdminLayout() {
    return (
        <div className={styles.adminLayout}>
            <AdminHeader />
            <div className={styles.adminBody}>
                <div className={styles.adminNavbar}>
                    <AdminNavbar />
                </div>
                <div className={styles.adminContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
