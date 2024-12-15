import { useState } from 'react';
import styles from './TableSearchBar.module.css';
import { FaSearch, FaTimes, FaTrash } from 'react-icons/fa';

export default function TableSearchBar({ 
    columns, 
    onSearch, 
    onColumnFilterChange 
}) {
    const [globalSearch, setGlobalSearch] = useState('');
    const [columnFilters, setColumnFilters] = useState(
        columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {})
    );

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
        const emptyFilters = columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {});
        setColumnFilters(emptyFilters);
        onSearch('');
        onColumnFilterChange(emptyFilters);
    };

    const hasActiveFilters = globalSearch || Object.values(columnFilters).some(value => value);

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
                {hasActiveFilters && (
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
                {columns.map(column => (
                    <div key={column.key} className={styles.filterField}>
                        {column?.showLabel && (
                            <span className={styles.columnLabel}>{column.label}</span>
                        )}
                        {column.type === 'select' ? (
                            <div className={styles.filterInputWrapper}>
                                <select
                                    value={columnFilters[column.key]}
                                    onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                                    className={columnFilters[column.key] ? styles.hasValue : ''}
                                >
                                    <option value="">{`All ${column.label}es`}</option>
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
                                        className={styles.clearButton}
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
        </div>
    );
}
