import { useEffect, useState } from 'react';
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
import { useFlight } from 'hooks/flight/useFlight';
import { useUser } from 'hooks/user/useUser';
import { useAirplane } from 'hooks/airplane/useAirplane';
import { useBooking } from 'hooks/booking/useBooking';

import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

export default function AdminDashboard() {
    const {getFlightCount, getAllFlights} = useFlight();
    const {getUserCount} = useUser();
    const {getAirplaneCount} = useAirplane();
    const {getTicketsSold, getAllBookings} = useBooking();

    const [aircraftCount, setAircraftCount] = useState(0);
    const [flightCount, setFlightCount] = useState(0);
    const [userCount, setUserCount] = useState(0); 
    const [ticketsSold, setTicketsSold] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        getAirplaneCount().then(data => 
            setAircraftCount(data.length)
        )
        getFlightCount().then(data =>
            setFlightCount(data.flightCount)
        )
        getUserCount().then(data => 
            setUserCount(data.userCount)
        )
        getTicketsSold().then(data => 
            setTicketsSold(data.ticketsSold)
        ) 
        getAllBookings().then(data => {
            setBookings(data)
        })
        getAllFlights().then(data => {
            setFlights(flights)
        })
    }, [])

    const dashboardStats = [
        {
            title: "Total Aircrafts",
            value: aircraftCount,
            icon: <FaPlane />,
            trend: "+12%",
            color: "#FF6B6B"
        },
        {
            title: "Total Flights",
            value: flightCount,
            icon: <FaRoute />,
            trend: "+5%",
            color: "#96CEB4"
        },
        {
            title: "Active Passengers",
            value: userCount,
            icon: <FaUsers />,
            trend: "+8%",
            color: "#4ECDC4"
        },
        {
            title: "Tickets Booked",
            value: ticketsSold,
            icon: <FaTicketAlt />,
            trend: "+23%",
            color: "#45B7D1"
        },
        
    ];

    const currentDayIndex = new Date().getDay();
    const daysOfWeekLabels = daysOfWeek({count: 7, start: 6});

    function getTicketsBorderColor(index) {
        return index === currentDayIndex ? "rgba(255, 107, 107, 1)" : "rgba(75, 192, 192, 1)";
    }

    function getTicketsBackgroundColor(index) {
        return index === currentDayIndex ? "rgba(255, 107, 107, 0.2)" : "rgba(75, 192, 192, 0.2)";
    }

    const inRangeToday = (date, offsetDays = 0) => {
        const parsedDate = Date.parse(date);
        return parsedDate < Date.now() + (1+offsetDays)*(24)*3600*1000 && parsedDate > Date.now() - (1-offsetDays)*(24)*3600*1000;
    }

    const [ticketData, setTicketData] = useState([]);

    useEffect(() => {
        setTicketData([
            5,
            2,
            4, 
            3, 
            5,
            6,
            bookings.filter(b => inRangeToday(b.created_at)).length,
        ]);
    }, [bookings])

    const ticketsSoldData = {
        labels: daysOfWeekLabels,
        datasets: [{
            label: "Tickets Booked",
            data: ticketData,
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
            data: [8, 4, 6, 7, 10, 8],
            fill: true,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.4
        },
        {
            label: "International",
            data: [7, 9, 7, 5, 7, 10],
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
                                {/* <span className={styles.trend}>{stat.trend}</span> */}
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
