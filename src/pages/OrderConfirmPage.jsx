import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import './OrderConfirmPage.css'; // ✅ Add this

function OrderConfirmPage() {
    const location = useLocation();
    const userName = location.state?.userName;

    if (!userName) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="order-confirmation-page">
            <h2>Thank you, {userName}!</h2>
            <p>Your order has been placed successfully.</p>
            <p>You will receive updates shortly (if this were a real app!).</p>
            <Link to="/" className="button-link go-home-btn">
                Go Back to Home
            </Link>
        </div>
    );
}

export default OrderConfirmPage;
