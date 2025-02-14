import { useState, useEffect } from 'react';
import styles from './AdminAircrafts.module.css';

import { useAirplane } from 'hooks/airplane/useAirplane';

import { LoadState } from 'types/states/LoadState';
import AdminTable from '../../components/AdminTable/AdminTable';
import AdminPageTitle from '../../components/PageTitle/AdminPageTitle';
import AdminModal from '../../components/Modal/AdminModal';
import Notification from 'components/Notification/Notification';

export default function AdminAircrafts() {

    const [aircrafts, setAircrafts] = useState([]);
    const [loadState, setLoadState] = useState(LoadState.LOADING);
    const { getAllAirplane, getAirplane, addAirplane, updateAirplane, deleteAirplane } = useAirplane();

    const [showNoti, setShowNoti] = useState(false);
    const [notiMessage, setNotiMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(true); 

    useEffect(() => {
        handleRefresh();
    }, []);

    const handleRefresh = () => {
        setLoadState(LoadState.LOADING);
        getAllAirplane().then((data) => {
            setAircrafts(data);
            setLoadState(LoadState.SUCCESS);
        }).catch((error) => {
            console.error(error);
            setLoadState(LoadState.ERROR);
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAircraft, setEditingAircraft] = useState({});

    const columns = [
        { key: 'idAirplane', label: 'ID', type: 'number' },
        { key: 'code', label: 'Aircraft Code', type: 'text' },
        { key: 'type', label: 'Aircraft Type', type: 'text' },
        { key: 'capacity', label: 'Capacity', type: 'number' },
        { 
            key: 'status', 
            label: 'Status', 
            type: 'checkbox',
            options: ['Active', 'Maintenance', 'Retired']
        }
    ];

    const handleAdd = () => {
        setEditingAircraft(null);
        setIsModalOpen(true);
    };

    const handleEdit = (aircraft) => {
        setEditingAircraft(aircraft);
        setIsModalOpen(true);
    };

    const handleDelete = (idAirplane) => {
        if (window.confirm('Are you sure you want to delete this aircraft?\n(THIS ACTION IS IRREVERSIBLE)')) {
            deleteAirplane(idAirplane).then(
                setAircrafts(aircrafts.filter(aircraft => aircraft.idAirplane !== idAirplane))
            );
        }
    };

    const handleSubmit = (formData) => {
        if (editingAircraft) {
            // Edit existing aircraft
            updateAirplane(formData).then(() => {
                console.log(aircrafts);
                setAircrafts(prev => 
                    prev.map(aircraft => 
                        aircraft.idAirplane === editingAircraft.idAirplane 
                            ? { ...formData, idAirplane: aircraft.idAirplane } 
                            : aircraft // Ensure to return the unchanged aircraft
                    )
                );
                console.log(aircrafts);
                setNotiMessage("Successfully updated aircraft!");
                setIsSuccessful(true);
                setShowNoti(true);
                setTimeout(() =>
                    setShowNoti(false), 2000
                );
            });
        } else {
            // Add new aircraft
            addAirplane(formData).then( (idAirplane) => {
                getAirplane(idAirplane).then (newAircraft =>
                    setAircrafts(prev => [
                        ...prev,
                        newAircraft,
                    ])
                )
                setNotiMessage("Successfully created aircraft!");
                setIsSuccessful(true);
                setShowNoti(true);
                setTimeout(() =>
                    setShowNoti(false), 2000
                );
                
                // handleRefresh()
                // setAircrafts([...aircrafts, { newAircraft }]);
            });
        }
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <Notification
                message={notiMessage}
                show={showNoti}
                isSuccessful={isSuccessful}
            />
            <AdminPageTitle title="Aircrafts Management" onAdd={handleAdd} label="Add Aircraft" />

            <AdminTable
                columns={columns}
                data={aircrafts}
                loadState={loadState}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRefresh={handleRefresh}
                idField="idAirplane"
                actions={true}
                itemsPerPage={10}
                pageSizeOptions={[5, 10, 20, 50]}
            />

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
        <AdminModal 
            title={aircraft ? 'Edit Aircraft' : 'Add Aircraft'} 
            onClose={onClose}
            handleSubmit={handleSubmit}
        >
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
                    onChange={e => {
                        const value = e.target.value;   
                        if (value < 0) {
                            return;
                        }
                        setFormData({...formData, capacity: value});
                    }}
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
                
            
        </AdminModal>
    );
} 