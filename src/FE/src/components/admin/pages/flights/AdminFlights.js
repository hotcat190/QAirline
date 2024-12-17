import { useState, useEffect } from 'react';
import styles from './AdminFlights.module.css';
import FlightMap from './FlightMap';
import TableSearchBar from '../../components/TableSearchBar/TableSearchBar';
import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';
import { searchFilter } from 'utils/filter/searchFilter';
import { columnFilter } from 'utils/filter/columnFilter';
import { RouteLineDecor } from './RouteLineDecor';

import { useFlight } from 'hooks/flight/useFlight';
import { LoadState } from 'types/states/LoadState';
import LoadingSpinner from 'components/LoadingPage/LoadingSpinner';

import { getCoordinates } from 'data/const/airportCoordinates';
import { formatDate } from 'utils/date/formatDate';

export default function AdminFlights() {
    const [selectedFlight, setSelectedFlight] = useState(null);

    const {getAllFlights} = useFlight();
    const [flights, setFlights] = useState([]);
    const [loadState, setLoadState] = useState(LoadState.LOADING);

    useEffect(() => {
        handleRefresh();
    }, []);

    const FlightStatus = {
        SCHEDULED: "Scheduled",
        ONGOING: "Ongoing",
        COMPLETED: "Completed",

    }

    const getFlightStatus = (flight) => {
        const departureTimeNumber = Date.parse(flight.departureTime)
        if (departureTimeNumber - Date.now() > 0) return FlightStatus.SCHEDULED;
        else if (Date.parse(flight.arrivalTime) - Date.now() > 0) return FlightStatus.ONGOING;
        else return FlightStatus.COMPLETED;
    }

    const handleRefresh = () => {
        setLoadState(LoadState.LOADING);
        getAllFlights().then((data) => {
            const mappedData = data.map(flight => ({ 
                idFlight: flight.idFlight,
                aircraftCode: flight.Airplane.code,
                aircraft: flight.Airplane.type,
                origin: flight.beginAirport.city,
                originCoords: Object.values(getCoordinates(flight.beginAirport.code)),
                destination: flight.endAirport.city,
                destinationCoords: Object.values(getCoordinates(flight.endAirport.code)),
                departureTime: formatDate(flight.timeStart),
                arrivalTime: formatDate(flight.timeEnd),
                status: getFlightStatus(flight),
            }))
            // .filter(flight => getFlightStatus(flight) === "")
            setFlights(mappedData);
            setLoadState(LoadState.SUCCESS);
        }).catch((error) => {
            console.error(error);
            setLoadState(LoadState.ERROR);
        });
    };

    const columns = [
        { key: 'aircraftCode', label: 'Aircraft Code', type: 'text' },
        { key: 'aircraft', label: 'Aircraft', type: 'text' },
        { key: 'origin', label: 'Origin', type: 'text' },
        { key: 'destination', label: 'Destination', type: 'text' },
        { key: 'departureTime', label: 'Departure', type: 'date', showLabel: true, labelPadding: 'medium' },
        { key: 'arrivalTime', label: 'Arrival', type: 'date', showLabel: true, labelPadding: 'medium' },
        { 
            key: 'status',
            label: 'Status', 
            type: 'select', 
            options: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'] 
        },
    ];

    const handleFlightCardClick = (flight) => {
        if (!selectedFlight) {  
            setSelectedFlight(flight)
        } else if (flight.idFlight === selectedFlight.idFlight) {
            setSelectedFlight(null)
        } else {
            setSelectedFlight(flight)
        }
    }

    const handleSearch = (searchQuery) => {
        const filteredFlights = flights.filter(flight => searchFilter(flight, searchQuery));
        setFlights(filteredFlights);
    }

    const handleColumnFilter = (filters) => {
        const filteredFlights = flights.filter(flight => columnFilter(flight, filters));
        setFlights(filteredFlights);
    }

    return (
        <div className={styles.flightsPage}>
            <AdminPageTitle title="Flights Tracking" />

            <div className={styles.content}>
                <div className={styles.listSection}>
                    <div className={styles.searchHeader}>
                        <TableSearchBar 
                            columns={columns}
                            onSearch={handleSearch}
                            onColumnFilterChange={handleColumnFilter}
                        />
                    </div>
                    {loadState === LoadState.LOADING ? (
                        <LoadingSpinner />
                    ) : (
                        <div className={styles.flightsList}>
                            {flights.map(flight => (
                                <div 
                                    key={flight.idFlight}
                                    className={`${styles.flightCard} ${selectedFlight?.idFlight === flight.idFlight ? styles.selected : ''}`}
                                    onClick={() => handleFlightCardClick(flight)}
                                >
                                    <div className={styles.flightHeader}>
                                        <span className={styles.flightNumber}>{flight.aircraftCode}</span>
                                        <span className={`${styles.status} ${styles[flight.status.toLowerCase()]}`}>
                                            {flight.status}
                                        </span>
                                    </div>
                                    <div className={styles.flightRoute}>
                                        <div className={styles.routePoint}>
                                            <div className={styles.city}>{flight.origin}</div>
                                            <div className={styles.time}>{flight.departureTime}</div>
                                        </div>
                                        <RouteLineDecor />
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
                    )}
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