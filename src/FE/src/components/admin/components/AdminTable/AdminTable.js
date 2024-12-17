import React from 'react';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaSync } from 'react-icons/fa';

import LoadingSpinner from 'components/LoadingPage/LoadingSpinner';
import { LoadState } from 'types/states/LoadState';

import EditButton from '../buttons/EditButton/EditButton';
import DeleteButton from '../buttons/DeleteButton/DeleteButton';
import RefreshButton from '../buttons/RefreshButton/RefreshButton';

import TableSearchBar from '../TableSearchBar/TableSearchBar';

import { searchFilter } from 'utils/filter/searchFilter';
import { columnFilter } from 'utils/filter/columnFilter';

import styles from './AdminTable.module.css';

export default function AdminTable({
    columns,
    data,
    loadState,
    onEdit,
    onDelete,
    onRefresh,
    idField = 'id',  // Default id field name
    actions = true,   // Whether to show action buttons
    itemsPerPage = 10, // Default items per page
    pageSizeOptions = [5, 10, 20, 50], // Options for items per page    
}) {
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (searchQuery) => {
        setGlobalSearch(searchQuery);
        // First apply column filters
        let filtered = data.filter(item => columnFilter(item, columnFilters));

        // Then apply global search
        if (searchQuery) {
            filtered = filtered.filter(item => searchFilter(item, searchQuery));
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const handleColumnFilter = (filters) => {
        setColumnFilters(filters);
        
        // Apply both filters and global search
        let filtered = data.filter(item => columnFilter(item, filters));

        // Apply global search if exists
        if (globalSearch) {
            filtered = filtered.filter(item => searchFilter(item, globalSearch));
        }

        setFilteredData(filtered);
        setCurrentPage(1);
    };

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(itemsPerPage);
    const [pageInput, setPageInput] = useState(currentPage.toString());

    // Calculate pagination values
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const currentData = filteredData.slice(startIndex, endIndex);

    // Handle page changes
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newSize) => {
        setPageSize(Number(newSize));
        setCurrentPage(1); // Reset to first page when changing page size
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [pageSize]);

    useEffect(() => {
        setPageInput(currentPage.toString());
    }, [currentPage]);

    // Add state for column filters
    const [columnFilters, setColumnFilters] = useState({});

    // Add state for global search
    const [globalSearch, setGlobalSearch] = useState('');

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
                <TableSearchBar
                    columns={columns}
                    onSearch={handleSearch}
                    onColumnFilterChange={handleColumnFilter}
                />
            </div>

            {/* Pagination Controls */}
            <div className={styles.paginationContainer}>
                <div className={styles.paginationInfo}>
                    Showing {startIndex + 1}-{endIndex} of {totalItems} items
                </div>

                <div style={{display: 'flex', gap: '1rem'}}>
                    <div className={styles.paginationControls}>
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className={styles.paginationButton}
                        >
                            First
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={styles.paginationButton}
                        >
                            <FaChevronLeft />
                        </button>
                        <span className={styles.pageInfo}>
                            Page{' '}
                            <input
                                type="number"
                                min={1}
                                max={totalPages}
                                value={pageInput}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '') {
                                        // Allow empty field without updating page
                                        setPageInput('');
                                        return;
                                    }
                                    const page = parseInt(value);
                                    if (page >= 1 && page <= totalPages) {
                                        handlePageChange(page);
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        handlePageChange(1);
                                    }
                                }}
                                style={{
                                    textAlign: 'center',
                                    margin: '0 4px',
                                    WebkitAppearance: 'textfield',
                                    MozAppearance: 'textfield',
                                    appearance: 'textfield',
                                }}
                            />
                            {' '}of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={styles.paginationButton}
                        >
                            <FaChevronRight />
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className={styles.paginationButton}
                        >
                            Last
                        </button>
                    </div>

                    <div className={styles.pageSize}>
                        <select 
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(e.target.value)}
                        >
                            {pageSizeOptions.map(size => (
                                <option key={size} value={size}>
                                    {size} per page
                                </option>
                            ))}
                        </select>
                    </div>

                    <RefreshButton onRefresh={onRefresh} loadState={loadState} />
                </div>
            </div>
            
            

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                            {actions && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(item => (
                            <tr key={item[idField]}>
                                {columns.map(column => (
                                    column.key === 'status' ? ( 
                                        <td key={column.key} className={styles.statusContainer}>
                                            <span className={`${styles.status} ${styles[item[column.key].toLowerCase()]}`}>
                                                {item[column.key]}
                                            </span>
                                        </td>
                                    ) : (
                                        <td key={column.key}>{item[column.key]}</td>
                                    )
                                ))}
                                {actions && (

                                    <td className={styles.actions}>
                                        <div className={styles.actionsContainer}>
                                            <EditButton onEdit={() => onEdit(item)} />
                                            <DeleteButton onDelete={() => onDelete(item[idField])} />
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                    {loadState === LoadState.LOADING && (
                        <tbody>
                            <tr>
                                <td colSpan={actions ? columns.length + 1 : columns.length}>
                                    <LoadingSpinner />
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {loadState === LoadState.ERROR && (
                        <tbody>
                            <tr>
                                <td 
                                    colSpan={actions ? columns.length + 1 : columns.length} 
                                    style={{ textAlign: 'center' }}
                                >
                                    Error loading data.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

            
        </div>
    );
}
