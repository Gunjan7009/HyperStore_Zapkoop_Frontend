import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByStore } from '../services/api';
import ProductItem from '../components/ProductItem';
import './StorePage.css'; // ✅ Make sure this file exists and contains styles

function StorePage() {
    const { storeId } = useParams();
    const [products, setProducts] = useState([]);
    const [storeName, setStoreName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            if (!storeId) return;
            setLoading(true);
            setError(null);
            try {
                const response = await getProductsByStore(storeId);
                setProducts(response.data);
                // Optionally set store name from response if available
                // setStoreName(response.data[0]?.store?.name || '');
            } catch (err) {
                console.error("Error fetching products:", err);
                let errorMsg = "Failed to load products.";
                if (err.response && err.response.status === 404) {
                    errorMsg = "Store or products not found.";
                }
                if (err.response?.data?.msg) {
                    errorMsg = err.response.data.msg;
                }
                setError(errorMsg);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [storeId]);

    if (loading) return <p className="loading-message">Loading products...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="store-page">
            <h2>Products in Store {storeName || `ID: ${storeId}`}</h2>

            {products.length === 0 ? (
                <p className="loading-message">No products found in this store.</p>
            ) : (
                <div className="product-list">
                    {products.map(product => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
            )}

            <div className="view-cart-link-container bottom">
                <Link to="/cart" className="view-cart-link button-link">
                    View Cart
                </Link>
            </div>
        </div>
    );
}

export default StorePage;
