import axios from 'axios';

const API_URL = "http://localhost:3000/api";
if (!API_URL) {
    console.warn("VITE_API_URL is not defined in .env. Falling back to default.");
    // You might set a default or throw an error, but ensure it's handled.
    // For development, maybe default to common backend port:
    // API_URL = 'http://localhost:5001/api';
}

console.log("Using API Base URL:", API_URL); // Add this log for debugging

const api = axios.create({
    baseURL: API_URL,
});

// Add request/response interceptors for logging or error handling if needed
api.interceptors.response.use(
    response => response,
    error => {
        console.error("API Call Error:", error.response || error.message || error);
        return Promise.reject(error);
    }
);
export const getStores = () => api.get('/stores/all/');
export const getProductsByStore = (storeId) => api.get(`/stores/${storeId}/products`);
export const placeOrder = (orderData) => api.post('/orders/', orderData);

// Add error handling as needed