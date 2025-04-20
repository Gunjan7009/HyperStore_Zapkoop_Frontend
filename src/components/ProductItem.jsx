import React from 'react';
import { useCart } from '../contexts/CartContext';
// import './ProductItem.css'; // Create and add basic styles

// Function to format currency (example for INR)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};


function ProductItem({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const success = addToCart(product); // addToCart now returns true/false
        if (success) {
            // Optional: Show a temporary confirmation message or animation
            console.log(`Added ${product.name} to cart.`);
        } else {
            // Alert/message handled within addToCart if trying to add from different store
             console.warn(`Could not add ${product.name} from a different store.`);
        }
    };

    return (
        <div className="product-item">
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatCurrency(product.price)}</p>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    );
}

export default ProductItem;