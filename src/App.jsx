import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import CartPage from './pages/CartPage';
import OrderConfirmPage from './pages/OrderConfirmPage';
import Header from './components/Header'; // Simple Header component
import './App.css'; // Basic styling

function App() {
    return (
        <CartProvider>
            <Router>
                <Header /> {/* Display header on all pages */}
                <div className="container"> {/* Add a container for padding/margin */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/store/:storeId" element={<StorePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmPage />} />
                        {/* Add a fallback route for 404 Not Found */}
                        <Route path="*" element={<div><h2>404 Not Found</h2><Link to="/">Go Home</Link></div>} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;