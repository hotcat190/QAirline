import { useState } from 'react';
import styles from './AdminFlights.module.css';
import FlightMap from './FlightMap';
import TableSearchBar from '../../components/TableSearchBar/TableSearchBar';
import Heading from '../../components/heading/Heading';
import { searchFilter } from 'utils/searchFilter';
import { columnFilter } from 'utils/columnFilter';
const dummyFlights = [
    {
        id: 'FL001',
        flightNumber: 'VN123',
        origin: 'Ho Chi Minh City',
        originCoords: [10.8231, 106.6297],
        destination: 'Hanoi',
        destinationCoords: [21.0285, 105.8542],
        departureTime: '2024-03-20 10:00',
        arrivalTime: '2024-03-20 12:00',
        status: 'Scheduled',
        aircraft: 'Boeing 787'
    },
    {
        id: 'FL002',
        flightNumber: 'VN124',
        origin: 'Da Nang',
        originCoords: [16.0474, 108.2062],
        destination: 'Hanoi',
        destinationCoords: [21.0285, 105.8542],
        departureTime: '2024-03-20 10:00',
        arrivalTime: '2024-03-20 12:00',
        status: 'Scheduled',
        aircraft: 'Boeing 787'
    },
    {
        id: 'FL003',
        flightNumber: 'VN124',
        origin: 'Da Nang',
        originCoords: [16.0474, 108.2062],
        destination: 'Hanoi',
        destinationCoords: [21.0285, 105.8542],
        departureTime: '2024-03-20 10:00',
        arrivalTime: '2024-03-20 12:00',
        status: 'Scheduled',
        aircraft: 'Boeing 787'
    },
    {
        id: 'FL004',
        flightNumber: 'VN124',
        origin: 'Da Nang',
        originCoords: [16.0474, 108.2062],
        destination: 'Hanoi',
        destinationCoords: [21.0285, 105.8542],
        departureTime: '2024-03-20 10:00',
        arrivalTime: '2024-03-20 12:00',
        status: 'Scheduled',
        aircraft: 'Boeing 787'
    },
    {
        id: 'FL005',
        flightNumber: 'VN124',
        origin: 'Da Nang',
        originCoords: [16.0474, 108.2062],
        destination: 'Hanoi',
        destinationCoords: [21.0285, 105.8542],
        departureTime: '2024-03-20 10:00',
        arrivalTime: '2024-03-20 12:00',
        status: 'Scheduled',
        aircraft: 'Boeing 787'
    },
    {
        id: 'FL006',
        flightNumber: 'VN124',
        origin: 'Da Nang',
        originCoords: [16.0474, 108.2062],
        destination: 'Hanoi',
        destinationCoords: [21.0285, 105.8542],
        departureTime: '2024-03-20 10:00',
        arrivalTime: '2024-03-20 12:00',
        status: 'Scheduled',
        aircraft: 'Boeing 787'
    },
    // Add more dummy data
];

export default function AdminFlights() {
    const [selectedFlight, setSelectedFlight] = useState(null);

    const [flights, setFlights] = useState(dummyFlights);

    const columns = [
        { key: 'flightNumber', label: 'Flight No.', type: 'text' },
        { key: 'aircraft', label: 'Aircraft', type: 'text' },
        { key: 'origin', label: 'Origin', type: 'text' },
        { key: 'destination', label: 'Destination', type: 'text' },
        { key: 'departureTime', label: 'Departure', type: 'date', showLabel: true },
        { key: 'arrivalTime', label: 'Arrival', type: 'date', showLabel: true },
        { 
            key: 'status',
            label: 'Status', 
            type: 'select', 
            options: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'] 
        },
    ];

    const handleAddFlight = () => {
        console.log('Add new flight');
    }

    const handleFlightCardClick = (flight) => {
        if (!selectedFlight) {  
            setSelectedFlight(flight)
        } else if (flight.id === selectedFlight.id) {
            setSelectedFlight(null)
        } else {
            setSelectedFlight(flight)
        }
    }

    const handleSearch = (searchQuery) => {
        const filteredFlights = dummyFlights.filter(flight => searchFilter(flight, searchQuery));
        setFlights(filteredFlights);
    }

    const handleColumnFilter = (filters) => {
        const filteredFlights = dummyFlights.filter(flight => columnFilter(flight, filters));
        setFlights(filteredFlights);
    }

    return (
        <div className={styles.flightsPage}>
            <Heading title="Flights Tracking" onAdd={handleAddFlight} label="Add New Flight" />

            <div className={styles.content}>
                <div className={styles.listSection}>
                    <div className={styles.searchHeader}>
                        <TableSearchBar 
                            columns={columns}
                            onSearch={handleSearch}
                            onColumnFilterChange={handleColumnFilter}
                        />
                    </div>
                    <div className={styles.flightsList}>
                        {flights.map(flight => (
                            <div 
                                key={flight.id}
                                className={`${styles.flightCard} ${selectedFlight?.id === flight.id ? styles.selected : ''}`}
                                onClick={() => handleFlightCardClick(flight)}
                            >
                                <div className={styles.flightHeader}>
                                    <span className={styles.flightNumber}>{flight.flightNumber}</span>
                                    <span className={`${styles.status} ${styles[flight.status.toLowerCase()]}`}>
                                        {flight.status}
                                    </span>
                                </div>
                                <div className={styles.flightRoute}>
                                    <div className={styles.routePoint}>
                                        <div className={styles.city}>{flight.origin}</div>
                                        <div className={styles.time}>{flight.departureTime}</div>
                                    </div>
                                    <div className={styles.routeLine}></div>
                                    <div className={styles.routePoint}>
                                        <div className={styles.city}>{flight.destination}</div>
                                        <div className={styles.time}>{flight.arrivalTime}</div>
                                    </div>
                                </div>
                                <div className={styles.flightFooter}>
                                    <span className={styles.aircraft}>{flight.aircraft}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className={styles.mapSection}>
                    <FlightMap 
                        flights={selectedFlight ? [selectedFlight] : []}
                    />
                </div>
            </div>
        </div>
    );
} 