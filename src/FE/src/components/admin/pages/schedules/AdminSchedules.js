import { useState, useEffect } from 'react';

import styles from './AdminSchedules.module.css';
import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';
import TableSearchBar from '../../components/TableSearchBar/TableSearchBar';
import { searchFilter } from 'utils/filter/searchFilter';
import { columnFilter } from 'utils/filter/columnFilter';
import LoadingSpinner from 'components/LoadingPage/LoadingSpinner';
import { LoadState } from 'types/states/LoadState';
import { useFlight } from 'hooks/flight/useFlight';
import { ScheduleCard } from './ScheduleCard';

const AdminSchedules = () => {
    const {getAllFlights} = useFlight();
    const [flights, setFlights] = useState([]);
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [loadState, setLoadState] = useState(LoadState.LOADING);

    // Define columns for the search bar
    const columns = [
        { key: 'flightNumber', label: 'Flight Number', type: 'text' },
        { key: 'aircraft', label: 'Aircraft', type: 'text' },
        { 
            key: 'origin', 
            label: 'Origin', 
            type: 'airport',
            options: ['Ho Chi Minh City', 'Hanoi', 'Incheon', /* ... other cities */] 
        },
        { 
            key: 'destination', 
            label: 'Destination', 
            type: 'airport',
            options: ['Ho Chi Minh City', 'Hanoi', 'Incheon', /* ... other cities */] 
        },
        { key: 'departureDate', label: 'Departure Date', type: 'date', showLabel: true, labelPadding: 'medium' },
        { key: 'arrivalDate', label: 'Arrival Date', type: 'date', showLabel: true, labelPadding: 'medium' },
        { 
            key: 'status', 
            label: 'Status', 
            type: 'checkbox',
            options: ['Scheduled', 'Ongoing', 'Completed'] 
        },
        { 
            key: 'classTypes', 
            label: 'Class Types', 
            type: 'checkbox',
            options: ['Economy', 'Business', 'First-Class'],
            matchType: 'partial' // or 'exact'
        }
    ];

    const defaultColumnFilters = columns.reduce((acc, col) => ({
        ...acc, [col.key]: col.key === 'status' ? col.options : ''
    }), {});
    const [columnFilters, setColumnFilters] = useState({});
    const [globalSearch, setGlobalSearch] = useState('');

    useEffect(() => {
        handleRefresh();
    }, []);

    const handleRefresh = () => {
        setLoadState(LoadState.LOADING);
        getAllFlights().then((data) => {
            setFlights(data);
            setLoadState(LoadState.SUCCESS);
        }).catch((error) => {
            console.error(error);
            setLoadState(LoadState.ERROR);
        });
    };

    const handleAddSchedule = () => {
        console.log('Add new schedule');
    }

    const handleResetFilters = () => {
        // Reset filter logic here
        setGlobalSearch('');
        setColumnFilters(defaultColumnFilters);
    }

    const handleSearch = (searchQuery) => {
        let filtered = flights.filter(flight => searchFilter(flight, searchQuery));
        filtered = filtered.filter(flight => columnFilter(flight, columnFilters));
        setFilteredFlights(filtered);
    }

    const handleColumnFilter = (filters) => {
        setColumnFilters(filters);
        let filtered = flights.filter(flight => columnFilter(flight, filters));
        if (globalSearch) {
            filtered = filtered.filter(item => searchFilter(item, globalSearch));
        }
        setFilteredFlights(filtered);
    }

    return (
        <div className={styles.schedulesPage}>
            <AdminPageTitle title="Schedules Management" onAdd={handleAddSchedule} label="Add Flight" />
            <div className={styles.mainContent}>
                <div className={styles.filtersCard}>
                    <div className={styles.filterHeader}>
                        <h3>Filters</h3>
                        <button 
                            className={styles.resetButton}
                            onClick={handleResetFilters}
                        >
                            Reset
                        </button>
                    </div>
                    <div className={styles.searchContainer}>
                        <TableSearchBar 
                            columns={columns}
                            onSearch={handleSearch}
                            onColumnFilterChange={handleColumnFilter}
                            showClearAllButton={false}
                            search={globalSearch}
                            filters={columnFilters}
                        />
                    </div>
                </div>
                <div className={styles.flightList}>
                    {loadState === LoadState.LOADING ? (
                        <LoadingSpinner />
                    ) : (
                        (filteredFlights.length > 0 ? filteredFlights : flights).map(flight => (
                            <ScheduleCard key={flight.idFlight} flight={flight}></ScheduleCard>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminSchedules;