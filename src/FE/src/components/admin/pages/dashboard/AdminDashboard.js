import styles from './AdminDashboard.module.css';
import { FaPlane, FaUsers, FaTicketAlt, FaRoute } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

import { months } from 'utils/date/months';
import { daysOfWeek } from 'utils/date/daysOfWeek';

import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

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

    const currentDayIndex = new Date().getDay();
    const daysOfWeekLabels = daysOfWeek({count: 7});

    function getTicketsBorderColor(index) {
        return index === currentDayIndex ? "rgba(255, 107, 107, 1)" : "rgba(75, 192, 192, 1)";
    }

    function getTicketsBackgroundColor(index) {
        return index === currentDayIndex ? "rgba(255, 107, 107, 0.2)" : "rgba(75, 192, 192, 0.2)";
    }

    const ticketsSoldData = {
        labels: daysOfWeekLabels,
        datasets: [{
            label: "Tickets Sold",
            data: [30, 45, 28, 60, 70, 50, 40],
            borderColor: daysOfWeekLabels.map((_, index) => getTicketsBorderColor(index)),
            backgroundColor: daysOfWeekLabels.map((_, index) => getTicketsBackgroundColor(index)),
            borderWidth: 2,
            borderRadius: 12,
            tension: 0.4
        }]
    };

    const ticketsSoldChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Weekly Ticket Sales",
            },
            filler: {
                propagate: true
            },
        },
    };

    const flightsScheduledData = {
        labels: months({count: 6, start: 6}),
        datasets: [{
            label: "Domestic",
            data: [20, 35, 40, 35, 30, 45],
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4
        },
        {
            label: "International",
            data: [30, 25, 30, 45, 55, 35],
            fill: true,
            borderColor: "rgba(255, 107, 107, 1)",
            backgroundColor: "rgba(255, 107, 107, 0.2)",
            borderWidth: 2,
            tension: 0.4
        }]
    };

    // Chart options
    const flightsScheduledChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Monthly Flights Scheduled",
            },            
        },
    };    

    return (
        <div className={styles.dashboard}>
            <AdminPageTitle title="Dashboard" />
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
            <div className={styles.chartsFlex}>
                <div className={styles.chartContainer}>
                    <Bar data={ticketsSoldData} options={ticketsSoldChartOptions} />
                </div>
                <div className={styles.chartContainer}>
                    <Line data={flightsScheduledData} options={flightsScheduledChartOptions} />
                </div>
            </div>
            {/* 2 */}
            <br />
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
            <div className={styles.chartsFlex}>
                <div className={styles.chartContainer}>
                    <Bar data={ticketsSoldData} options={ticketsSoldChartOptions} />
                </div>
                <div className={styles.chartContainer}>
                    <Line data={flightsScheduledData} options={flightsScheduledChartOptions} />
                </div>
            </div>
        </div>
    );
}
