import { useEffect, useState } from 'react';
import styles from './AdminBookings.module.css';
import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';
import AdminTable from 'components/admin/components/AdminTable/AdminTable';
import { searchFilter } from 'utils/filter/searchFilter';
import { columnFilter } from 'utils/filter/columnFilter';
import { LoadState } from 'types/states/LoadState';
import { useBooking } from 'hooks/booking/useBooking';
import { formatDate } from 'utils/date/formatDate';

const dummyBookings = [
    {
        id: 'BK001',
        passengerName: 'Nguyen Van A',
        flightNumber: 'VN123',
        departure: 'Ho Chi Minh City',
        destination: 'Hanoi',
        bookingDate: '2024-03-18',
        travelDate: '2024-03-20',
        status: 'Confirmed',
        amount: '2,500,000 VND',
    },
    // Add more dummy data as needed
];

export default function AdminBookings() {
    const { getAllBookings } = useBooking();
    const [bookings, setBookings] = useState([]);
    const [loadState, setLoadState] = useState(LoadState.LOADING);

    useEffect(() => {
        handleRefresh();
    }, []);

    const getTicketStatus = {
        'Paid': 'Confirmed',
        'Unpaid': 'Pending',
        'Cancelled': 'Cancelled',
    }

    const handleRefresh = () => {
        setLoadState(LoadState.LOADING);
        getAllBookings().then((data) => {
            const mappedData = data.map(ticket => ({
                id: ticket.idTicket,
                code: ticket.code,
                passengerName: ticket.Customer.username,
                flightNumber: `QA${ticket.ClassFlight.Flight.idFlight}`,
                class: ticket.ClassFlight.class,
                departure: ticket.ClassFlight.Flight.beginAirport.city,
                destination: ticket.ClassFlight.Flight.endAirport.city,
                bookingDate: formatDate(ticket.created_at),
                travelDate: formatDate(ticket.ClassFlight.Flight.timeStart),
                status: getTicketStatus[ticket.status],
                amount: ticket.price,
                created_at: ticket.created_at,
            }));
            console.log(mappedData);
            setBookings(mappedData);
            setLoadState(LoadState.SUCCESS);
        }).catch((error) => {
            console.error(error);
            setLoadState(LoadState.ERROR);
        });
    };

    const columns = [
        { key: 'id', label: 'Booking ID', type: 'text' },
        // { key: 'code', label: 'Booking Code', type: 'text'},
        { key: 'passengerName', label: 'Passenger', type: 'text' },
        { key: 'flightNumber', label: 'Flight', type: 'text' },
        {
            key: 'class',
            label: 'Class',
            type: 'checkbox',
            options: ['Economy', 'Business', 'First-Class']
        },
        { key: 'departure', label: 'Departure Airport', type: 'text' },
        { key: 'destination', label: 'Destination Airport', type: 'text' },
        { key: 'amount', label: 'Amount', type: 'text' },
        { key: 'bookingDate', label: 'Booking Date', type: 'datetime', showLabel: true, labelPadding: 'medium'},
        { key: 'travelDate', label: 'Travel Date', type: 'datetime', showLabel: true, labelPadding: 'medium' },
        { 
            key: 'status', 
            label: 'Status', 
            type: 'checkbox',
            options: ['Confirmed', 'Pending']
        },
        
    ];    

    const inRangeToday = (date) => {
        const parsedDate = Date.parse(date);
        return parsedDate < Date.now() + 24*3600*1000 && parsedDate > Date.now() - 24*3600*1000
    }

    return (
        <div className={styles.bookingsPage}>
            <AdminPageTitle title="Bookings Management" />

            <div className={styles.statsCards}>
                <div className={styles.statCard}>
                    <h3>Total Bookings</h3>
                    <p>{bookings.length}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Today's Bookings</h3>
                    <p>{bookings.filter(b => inRangeToday(b.created_at)).length}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Pending Confirmation</h3>
                    <p>{bookings.filter(b => b.status === 'Pending').length}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Revenue</h3>
                    <p>{bookings.reduce((acc, val) => Number(acc) + Number(val.amount), 0)/1000000}M</p>
                </div>
            </div>

            <div className={styles.tableSection}>
                <AdminTable
                    columns={columns}
                    data={bookings}
                    loadState={loadState}
                    onRefresh={handleRefresh}
                    idField='id'
                    actions={false}
                />
            </div>
        </div>
    );
}