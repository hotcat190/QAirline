import styles from './AdminDashboard.module.css';
import { FaPlane, FaUsers, FaTicketAlt, FaRoute } from 'react-icons/fa';

export default function AdminDashboard() {
    const dashboardStats = [
        {
            title: "Total Flights",
            value: "1,234",
            icon: <FaPlane />,
            trend: "+12%",
            color: "#FF6B6B"
        },
        {
            title: "Active Passengers",
            value: "45.2K",
            icon: <FaUsers />,
            trend: "+8%",
            color: "#4ECDC4"
        },
        {
            title: "Tickets Sold",
            value: "892",
            icon: <FaTicketAlt />,
            trend: "+23%",
            color: "#45B7D1"
        },
        {
            title: "Routes",
            value: "89",
            icon: <FaRoute />,
            trend: "+5%",
            color: "#96CEB4"
        }
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
                {dashboardStats.map((stat, index) => (
                    <div className={styles.statCard} key={index}>
                        <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className={styles.statInfo}>
                            <h3>{stat.title}</h3>
                            <div className={styles.statValue}>
                                <span>{stat.value}</span>
                                <span className={styles.trend}>{stat.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
