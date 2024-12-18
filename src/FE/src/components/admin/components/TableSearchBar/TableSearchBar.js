import { useState, useEffect } from 'react';
import styles from './TableSearchBar.module.css';
import { FaSearch, FaTimes, FaTrash } from 'react-icons/fa';

export default function TableSearchBar({ 
    columns, 
    onSearch,
    onColumnFilterChange,
    showClearAllButton = true,
    search = '',
    filters = '', 
}) {
    const defaultColumnFilters = columns.reduce((acc, col) => ({
        ...acc, [col.key]: col.key === 'status' ? col.options : ''
    }), {})

    const [globalSearch, setGlobalSearch] = useState('');
    const [columnFilters, setColumnFilters] = useState(
        defaultColumnFilters
    );

    useEffect(() => {
        setGlobalSearch(search);
    }, [search]);

    useEffect(() => {
        setColumnFilters(filters);
    }, [filters]);


    const handleGlobalSearch = (value) => {
        setGlobalSearch(value);
        onSearch(value);
    };

    const handleColumnFilter = (column, value) => {
        const newFilters = {
            ...columnFilters,
            [column]: value
        };
        setColumnFilters(newFilters);
        onColumnFilterChange(newFilters);
    };

    const clearGlobalSearch = () => {
        setGlobalSearch('');
        onSearch('');
    };

    const clearColumnFilter = (column) => {
        const newFilters = {
            ...columnFilters,
            [column]: ''
        };
        setColumnFilters(newFilters);
        onColumnFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        setGlobalSearch('');
        setColumnFilters(defaultColumnFilters);
        onSearch('');
        onColumnFilterChange(defaultColumnFilters);
    };

    const hasActiveFilters = globalSearch || columnFilters['status']?.length !== defaultColumnFilters['status']?.length;

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchHeader}>
                <div className={`${styles.globalSearch} ${globalSearch ? styles.hasValue : ''}`}>
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search across all fields..."
                        value={globalSearch}
                        className={globalSearch ? styles.hasValue : ''}
                        onChange={(e) => handleGlobalSearch(e.target.value)}
                    />
                    {globalSearch && (
                        <button 
                            className={styles.clearButton}
                            onClick={clearGlobalSearch}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
                {hasActiveFilters && (showClearAllButton === true) && (
                    <button 
                        className={styles.clearAllButton}
                        onClick={clearAllFilters}
                        id="clear-all-filters"
                    >
                        <FaTrash /> Clear All Filters
                    </button>
                )}
            </div>

            {/* Column Filters */}
            <div className={styles.columnFilters}>
                {columns.map(column => column.type !== 'checkbox' && (                    
                    <div key={column.key} className={styles.filterField}>
                        {column?.label && column.showLabel && (
                            <span className={`${styles.columnLabel} ${column.labelPadding ? styles[`padding${column.labelPadding}`] : ''}`}>
                                {column.label}
                            </span>
                        )}
                        {column.type === 'select' ? (
                            <div className={styles.filterInputWrapper}>
                                <select
                                    value={columnFilters[column.key]}
                                    onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                                    className={columnFilters[column.key] ? styles.hasValue : ''}
                                >
                                    <option value="">{`${column.label}`}</option>
                                    {column.options.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {columnFilters[column.key] && (
                                    <button 
                                        className={styles.clearButton}
                                        style={{right: "16px"}}
                                        onClick={() => clearColumnFilter(column.key)}
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        ) : column.type === 'date' ? (
                            <div className={styles.filterInputWrapper}>
                                <input
                                    type="date"
                                    value={columnFilters[column.key]}
                                    onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                                />
                                {columnFilters[column.key] && (
                                    <button 
                                        className={`${styles.clearButton} ${styles.dateInput}`}
                                        onClick={() => clearColumnFilter(column.key)}
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className={styles.filterInputWrapper}>
                                <input
                                    type="text"
                                    placeholder={`Filter ${column.label}`}
                                    value={columnFilters[column.key]}
                                    onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                                    className={columnFilters[column.key] ? styles.hasValue : ''}
                                />
                                {columnFilters[column.key] && (
                                    <button 
                                        className={styles.clearButton}
                                        onClick={() => clearColumnFilter(column.key)}
                                    >
                                        <FaTimes />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.statusFilter}>
                {columns.map(column => column.type === 'checkbox' && (
                    // <div key={column.key} className={`${styles.statusWrapper} ${(columnFilters[column.key]) ? styles.active : ''}`}>
                    <div key={column.key} className={`${styles.statusWrapper}`}>
                        <div className={styles.statusHeader}>
                            <span className={styles.columnLabel}>{column.label}</span>
                            <div className={styles.statusButtons}>
                                <button
                                    className={`${styles.statusToggleButton} ${columnFilters[column.key]?.length === column.options.length ? styles.active : ''}`}
                                    onClick={() => handleColumnFilter(column.key, [...column.options])}
                                    disabled={columnFilters[column.key]?.length === column.options.length}
                                >
                                    Select All
                                </button>
                                <button
                                    className={`${styles.statusToggleButton} ${(!columnFilters[column.key] || columnFilters[column.key].length === 0) ? styles.active : ''}`}
                                    onClick={() => handleColumnFilter(column.key, [])}
                                    disabled={!columnFilters[column.key] || columnFilters[column.key].length === 0}
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                        <div className={styles.checkboxWrapper}>
                            {column.options.map(option => (
                                <label 
                                    key={option} 
                                    className={styles.checkboxField} 
                                    htmlFor={`checkbox-${option}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${option}`}
                                        checked={columnFilters[column.key]?.includes(option)}
                                        onChange={(e) => {
                                            const newValue = e.target.checked
                                                ? [...(columnFilters[column.key] || []), option]
                                                : columnFilters[column.key].filter(opt => opt !== option);
                                            handleColumnFilter(column.key, newValue);
                                        }}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


