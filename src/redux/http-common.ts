import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://memegenerator-h2ed.onrender.com/api/images', // Replace with your Flask API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    // Add your authentication token handling here if needed
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add your error handling interceptor here if needed