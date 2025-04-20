import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStores } from '../services/api';
import './HomePage.css'; // Make sure this import points to your CSS file

function HomePage() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true);
                const response = await getStores();
                setStores(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching stores:", err);
                setError("Failed to load stores. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchStores();
    }, []);

    return (
        <div className="homepage-container">
            <h1 className="homepage-title">🛍️ Hyperlocal Stores</h1>

            {loading && <p className="loading">Loading stores...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <>
                    {stores.length === 0 ? (
                        <p className="no-stores">No stores available right now.</p>
                    ) : (
                        <ul className="store-list">
                            {stores.map(store => (
                                <li key={store._id} className="store-item">
                                    <Link to={`/store/${store._id}`} className="store-link">
                                        <h2>{store.name}</h2>
                                        <p>{store.location}</p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage;
