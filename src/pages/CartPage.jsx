import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { placeOrder } from '../services/api';
import CartItem from '../components/CartItem';
 import './CartPage.css';

// Function to format currency (example for INR)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
};

function CartPage() {
    const { cartItems, getCartTotal, clearCart, currentStoreId } = useCart();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePlaceOrder = async (event) => {
        event.preventDefault(); // Prevent default form submission if wrapped in form
        setError(null);

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (!currentStoreId || cartItems.length === 0) {
             setError("Your cart is empty or store is not selected.");
            return;
        }


        const orderData = {
            userName: name.trim(),
            storeId: currentStoreId,
            items: cartItems.map(item => ({
                product: {                   // Create the nested product object
                    _id: item.product._id,   // Assign the product's _id
                    price: item.product.price // Assign the product's price
                },
                quantity: item.quantity      // Assign the quantity
            })),
            totalAmount: getCartTotal()
        };

        console.log('Submitting Order Data:', JSON.stringify(orderData, null, 2));

        setLoading(true);
        try {
            const response = await placeOrder(orderData);
            console.log('Order placed:', response.data);
            clearCart(); // Clear cart on success
            // Pass user name to confirmation page via navigation state
            navigate('/order-confirmation', { state: { userName: name.trim() } });
        } catch (err) {
            console.error("Error placing order:", err.response ? err.response.data : err);
             let errorMsg = "Failed to place order. Please try again.";
             if (err.response && err.response.data && err.response.data.msg) {
                 errorMsg = err.response.data.msg; // Use backend message
             }
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-page empty-cart">
                <h2>Your Cart</h2>
                <p>Your cart is empty.</p>
                <Link to="/" className="button-link">Browse Stores</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            <div className="cart-items-list">
                {cartItems.map(item => (
                    // Ensure item has a unique key, product._id should work if unique in cart
                    <CartItem key={item.product._id} item={item} />
                ))}
            </div>
            <div className="cart-summary">
                <h3>Total: {formatCurrency(getCartTotal())}</h3>
                <form onSubmit={handlePlaceOrder} className="checkout-form">
                     <div className="form-group">
                        <label htmlFor="userName">Your Name:</label>
                        <input
                            type="text"
                            id="userName"
                            value={name}
                            onChange={handleNameChange}
                            required
                            placeholder="Enter your name"
                            disabled={loading}
                        />
                     </div>
                     {error && <p className="error-message">{error}</p>}
                     <button type="submit" className="place-order-btn" disabled={loading || !name.trim()}>
                         {loading ? 'Placing Order...' : 'Place Order'}
                     </button>
                </form>

            </div>
        </div>
    );
}

export default CartPage;