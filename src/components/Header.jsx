import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // To show cart count (optional)
// import './Header.css'; // Create and add basic styles

function Header() {
    const { cartItems } = useCart();
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="app-header">
            <div className="container header-content">
                <h1 className="app-title">
                    <Link to="/">Hyperlocal Stores</Link>
                </h1>
                <nav className="main-nav">
                    <Link to="/cart" className="cart-link">
                        Cart {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;