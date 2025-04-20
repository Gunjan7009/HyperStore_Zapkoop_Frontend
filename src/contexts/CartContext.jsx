import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [currentStoreId, setCurrentStoreId] = useState(null); // Track which store the cart is for

    // Load cart from local storage on initial render (optional persistence)
    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        const savedStoreId = localStorage.getItem('currentStoreId');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
         if (savedStoreId) {
            setCurrentStoreId(savedStoreId);
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
         if (currentStoreId) {
            localStorage.setItem('currentStoreId', currentStoreId);
        } else {
             localStorage.removeItem('currentStoreId');
        }
    }, [cartItems, currentStoreId]);


    const addToCart = (product) => {
        // Check if adding from a different store
        if (currentStoreId && currentStoreId !== product.store) {
            // Option 1: Alert user and don't add
             alert("You can only order from one store at a time. Clear your cart to switch stores.");
             return false; // Indicate failure
            // Option 2: Clear cart and add new item (ask for confirmation first ideally)
            // if (window.confirm("Clear cart and add item from new store?")) {
            //     clearCart();
            //     setCurrentStoreId(product.store);
            // } else {
            //     return false;
            // }
        } else if (!currentStoreId) {
             setCurrentStoreId(product.store); // Set store ID if cart was empty
        }


        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product._id === product._id);
            if (existingItem) {
                // Increase quantity
                return prevItems.map(item =>
                    item.product._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item
                return [...prevItems, { product: product, quantity: 1 }];
            }
        });
        return true; // Indicate success
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product._id !== productId));
         // Clear store if cart becomes empty
         if (cartItems.length === 1) {
             setCurrentStoreId(null);
         }
    };

    const updateQuantity = (productId, quantity) => {
        const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setCurrentStoreId(null); // Clear store ID
         localStorage.removeItem('cartItems');
         localStorage.removeItem('currentStoreId');
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const value = {
        cartItems,
        currentStoreId,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};