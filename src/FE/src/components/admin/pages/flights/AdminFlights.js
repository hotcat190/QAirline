import { useState } from 'react';
import styles from './AdminFlights.module.css';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';

export default function AdminFlights() {
    const [searchQuery, setSearchQuery] = useState('');
    
    const dummyFlights = [
        {
            id: 'FL001',
            flightNumber: 'VN123',
            origin: 'Ho Chi Minh City',
            destination: 'Hanoi',
            departureTime: '2024-03-20 10:00',
            arrivalTime: '2024-03-20 12:00',
            status: 'Scheduled',
            aircraft: 'Boeing 787'
        },
        // Add more dummy data as needed
    ];

    return (
        <div className={styles.flightsPage}>
            <div className={styles.header}>
                <h1>Flights Management</h1>
                <button className={styles.addButton}>
                    <FaPlus /> Add New Flight
                </button>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchBar}>
                    <FaSearch />
                    <input 
                        type="text"
                        placeholder="Search flights..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className={styles.filters}>
                    <button className={styles.filterButton}>
                        <FaFilter /> Filters
                    </button>
                    <select className={styles.statusFilter}>
                        <option value="">All Statuses</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="in-flight">In Flight</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.flightsTable}>
                    <thead>
                        <tr>
                            <th>Flight No.</th>
                            <th>Origin</th>
                            <th>Destination</th>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>Status</th>
                            <th>Aircraft</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyFlights.map(flight => (
                            <tr key={flight.id}>
                                <td>{flight.flightNumber}</td>
                                <td>{flight.origin}</td>
                                <td>{flight.destination}</td>
                                <td>{flight.departureTime}</td>
                                <td>{flight.arrivalTime}</td>
                                <td>
                                    <span className={styles.status}>
                                        {flight.status}
                                    </span>
                                </td>
                                <td>{flight.aircraft}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.editButton}>Edit</button>
                                        <button className={styles.deleteButton}>Delete</button>
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