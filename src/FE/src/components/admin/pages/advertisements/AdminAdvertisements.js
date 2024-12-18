import { useState } from 'react';
import styles from './AdminAdvertisements.module.css';
import { FaPlus, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import AdminPageTitle from 'components/admin/components/PageTitle/AdminPageTitle';

const mockAdvertisements = [
    {
        id: 1,
        imageUrl: 'https://example.com/ad1.jpg',
        title: 'Summer Sale',
        link: 'https://example.com/summer-sale',
        active: true,
        order: 1
    }
]

export default function AdminAdvertisements() {

    const [advertisements, setAdvertisements] = useState(mockAdvertisements);

    const [newAd, setNewAd] = useState({
        title: '',
        link: '',
        imageFile: null,
        imagePreview: null
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAd({
                ...newAd,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            });
        }
    };

    const handleMoveAd = (id, direction) => {
        // Implement order changing logic
    };

    const handleDeleteAd = (id) => {
        // Implement delete logic
    };

    const handleToggleActive = (id) => {
        // Implement toggle active status logic
    };

    return (
        <div className={styles.advertisementsPage}>
            <AdminPageTitle title="Advertisements"/>

            <div className={styles.uploadSection}>
                <h2>Add New Advertisement</h2>
                <div className={styles.uploadForm}>
                    <div className={styles.imageUpload}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="imageUpload"
                            className={styles.fileInput}
                        />
                        <label htmlFor="imageUpload" className={styles.uploadLabel}>
                            {newAd.imagePreview ? (
                                <img src={newAd.imagePreview} alt="Preview" />
                            ) : (
                                <>
                                    <FaPlus />
                                    <span>Upload Image</span>
                                </>
                            )}
                        </label>
                    </div>
                    <div className={styles.formFields}>
                        <input
                            type="text"
                            placeholder="Advertisement Title"
                            value={newAd.title}
                            onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                        />
                        <input
                            type="url"
                            placeholder="Advertisement Link"
                            value={newAd.link}
                            onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
                        />
                        <button className={styles.submitButton}>Add Advertisement</button>
                    </div>
                </div>
            </div>

            <div className={styles.currentAds}>
                <h2>Current Advertisements</h2>
                <div className={styles.adsGrid}>
                    {advertisements.map((ad) => (
                        <div key={ad.id} className={styles.adCard}>
                            <img src={ad.imageUrl} alt={ad.title} />
                            <div className={styles.adInfo}>
                                <h3>{ad.title}</h3>
                                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                                    {ad.link}
                                </a>
                            </div>
                            <div className={styles.adControls}>
                                <button
                                    className={`${styles.toggleButton} ${ad.active ? styles.active : ''}`}
                                    onClick={() => handleToggleActive(ad.id)}
                                >
                                    {ad.active ? 'Active' : 'Inactive'}
                                </button>
                                <div className={styles.orderControls}>
                                    <button onClick={() => handleMoveAd(ad.id, 'up')}>
                                        <FaArrowUp />
                                    </button>
                                    <button onClick={() => handleMoveAd(ad.id, 'down')}>
                                        <FaArrowDown />
                                    </button>
                                </div>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeleteAd(ad.id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 