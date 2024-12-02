import { useState } from 'react';
import styles from './AdminAircrafts.module.css';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminAircrafts() {
    const [aircrafts, setAircrafts] = useState([
        { id: 1, code: 'AB123', type: 'Boeing 737', capacity: 180, status: 'Active' },
        { id: 2, code: 'CD456', type: 'Airbus A320', capacity: 150, status: 'Maintenance' },
        { id: 3, code: 'EF789', type: 'Boeing 787', capacity: 330, status: 'Active' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAircraft, setEditingAircraft] = useState(null);

    const columns = [
        { key: 'code', label: 'Aircraft Code' },
        { key: 'type', label: 'Aircraft Type' },
        { key: 'capacity', label: 'Capacity' },
        { key: 'status', label: 'Status' },
    ];

    const handleAdd = () => {
        setEditingAircraft(null);
        setIsModalOpen(true);
    };

    const handleEdit = (aircraft) => {
        setEditingAircraft(aircraft);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this aircraft?')) {
            setAircrafts(aircrafts.filter(aircraft => aircraft.id !== id));
        }
    };

    const handleSubmit = (formData) => {
        if (editingAircraft) {
            // Edit existing aircraft
            setAircrafts(aircrafts.map(aircraft => 
                aircraft.id === editingAircraft.id ? { ...formData, id: aircraft.id } : aircraft
            ));
        } else {
            // Add new aircraft
            setAircrafts([...aircrafts, { ...formData, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Aircraft Management</h1>
                <button className={styles.addButton} onClick={handleAdd}>
                    <FaPlus /> Add Aircraft
                </button>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.key}>{column.label}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aircrafts.map(aircraft => (
                            <tr key={aircraft.id}>
                                {columns.map(column => (
                                    <td key={column.key}>{aircraft[column.key]}</td>
                                ))}
                                <td className={styles.actions}>
                                    <button 
                                        className={styles.editButton}
                                        onClick={() => handleEdit(aircraft)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className={styles.deleteButton}
                                        onClick={() => handleDelete(aircraft.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <AircraftModal
                    aircraft={editingAircraft}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

function AircraftModal({ aircraft, onClose, onSubmit }) {
    const [formData, setFormData] = useState(aircraft || {
        code: '',
        type: '',
        capacity: '',
        status: 'Active'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{aircraft ? 'Edit Aircraft' : 'Add Aircraft'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Aircraft Code</label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={e => setFormData({...formData, code: e.target.value})}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Aircraft Type</label>
                        <input
                            type="text"
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value})}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Capacity</label>
                        <input
                            type="number"
                            value={formData.capacity}
                            onChange={e => setFormData({...formData, capacity: e.target.value})}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Status</label>
                        <select
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="Active">Active</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Retired">Retired</option>
                        </select>
                    </div>
                    <div className={styles.modalActions}>
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
} 