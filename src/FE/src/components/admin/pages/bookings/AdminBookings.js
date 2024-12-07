import { useState } from 'react';
import styles from './AdminBookings.module.css';
import { FaSearch, FaFilter, FaEye, FaEdit } from 'react-icons/fa';

export default function AdminBookings() {
    const [searchQuery, setSearchQuery] = useState('');
    const [columnFilters, setColumnFilters] = useState({
        bookingId: '',
        passenger: '',
        flight: '',
        status: '',
        travelDate: ''
    });

    const dummyBookings = [
        {
            id: 'BK001',
            passengerName: 'Nguyen Van A',
            flightNumber: 'VN123',
            route: 'Ho Chi Minh City → Hanoi',
            bookingDate: '2024-03-18',
            travelDate: '2024-03-20',
            status: 'Confirmed',
            amount: '2,500,000 VND',
            seats: '2A, 2B'
        },
        // Add more dummy data as needed
    ];

    // Add filter handling
    const handleFilterChange = (column, value) => {
        setColumnFilters(prev => ({
            ...prev,
            [column]: value
        }));
    };

    // Filter the bookings based on search and column filters
    const filteredBookings = dummyBookings.filter(booking => {
        // Search across all fields
        const matchesSearch = Object.values(booking)
            .join(' ')
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        // Check column specific filters
        const matchesColumnFilters = 
            (!columnFilters.bookingId || booking.id.toLowerCase().includes(columnFilters.bookingId.toLowerCase())) &&
            (!columnFilters.passenger || booking.passengerName.toLowerCase().includes(columnFilters.passenger.toLowerCase())) &&
            (!columnFilters.flight || booking.flightNumber.toLowerCase().includes(columnFilters.flight.toLowerCase())) &&
            (!columnFilters.status || booking.status === columnFilters.status) &&
            (!columnFilters.travelDate || booking.travelDate === columnFilters.travelDate);

        return matchesSearch && matchesColumnFilters;
    });

    return (
        <div className={styles.bookingsPage}>
            <div className={styles.header}>
                <h1>Bookings Management</h1>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <FaSearch />
                    <input 
                        type="text"
                        placeholder="Search across all fields..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.columnFilters}>
                <input
                    type="text"
                    placeholder="Filter Booking ID"
                    value={columnFilters.bookingId}
                    onChange={(e) => handleFilterChange('bookingId', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter Passenger"
                    value={columnFilters.passenger}
                    onChange={(e) => handleFilterChange('passenger', e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter Flight"
                    value={columnFilters.flight}
                    onChange={(e) => handleFilterChange('flight', e.target.value)}
                />
                <select
                    value={columnFilters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                </select>
                <input
                    type="date"
                    value={columnFilters.travelDate}
                    onChange={(e) => handleFilterChange('travelDate', e.target.value)}
                />
            </div>

            <div className={styles.statsCards}>
                <div className={styles.statCard}>
                    <h3>Total Bookings</h3>
                    <p>1,234</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Today's Bookings</h3>
                    <p>45</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Pending Confirmation</h3>
                    <p>12</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Total Revenue</h3>
                    <p>123.5M VND</p>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.bookingsTable}>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Passenger</th>
                            <th>Flight</th>
                            <th>Route</th>
                            <th>Booking Date</th>
                            <th>Travel Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.passengerName}</td>
                                <td>{booking.flightNumber}</td>
                                <td>{booking.route}</td>
                                <td>{booking.bookingDate}</td>
                                <td>{booking.travelDate}</td>
                                <td>
                                    <span className={`${styles.status} ${styles[booking.status.toLowerCase()]}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>{booking.amount}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.viewButton}>
                                            <FaEye />
                                            <span>View</span>
                                        </button>
                                        <button className={styles.updateButton}>
                                            <FaEdit />
                                            <div>Update Status</div>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}