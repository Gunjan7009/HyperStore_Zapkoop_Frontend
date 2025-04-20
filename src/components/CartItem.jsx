import React from 'react';
import { useCart } from '../contexts/CartContext';
// import './CartItem.css'; // Create and add basic styles

// Function to format currency (example for INR)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    const handleIncrease = () => {
        updateQuantity(item.product._id, item.quantity + 1);
    };

    const handleDecrease = () => {
        // Prevent quantity from going below 1, remove if it reaches 0 implicitly?
        // Or handle removal separately. Let's keep it >= 1 via updateQuantity.
        updateQuantity(item.product._id, item.quantity - 1);
    };

    const handleRemove = () => {
        removeFromCart(item.product._id);
    };

     // Ensure item and item.product exist before rendering
    if (!item || !item.product) {
        return null; // Or some placeholder/error display
    }


    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <span className="cart-item-name">{item.product.name}</span>
                <span className="cart-item-price">{formatCurrency(item.product.price)}</span>
            </div>
            <div className="cart-item-controls">
                <button onClick={handleDecrease} disabled={item.quantity <= 1}>-</button>
                <span className="cart-item-quantity">{item.quantity}</span>
                <button onClick={handleIncrease}>+</button>
            </div>
            <div className="cart-item-total">
                 {formatCurrency(item.product.price * item.quantity)}
            </div>
            <button onClick={handleRemove} className="remove-item-btn">Remove</button>
        </div>
    );
}

export default CartItem;