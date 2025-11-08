import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error: Backend server might not be running or CORS issue');
      console.error('Make sure backend is running on:', API_BASE_URL.replace('/api', ''));
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getProducts: (page = 1, limit = 20) => 
    api.get(`/products?page=${page}&limit=${limit}`),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, qty = 1) => 
    api.post('/cart', { productId, qty }),
  removeFromCart: (itemId) => 
    api.delete(`/cart/${itemId}`),
};

export const checkoutAPI = {
  checkout: (user, cartItems) => 
    api.post('/checkout', { user, cartItems }),
};

export const authAPI = {
  signup: (name, email, password) => 
    api.post('/auth/signup', { name, email, password }),
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  logout: () => 
    api.post('/auth/logout'),
};

export default api;

