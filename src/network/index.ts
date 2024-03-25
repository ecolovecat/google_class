import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:17000'
});

API.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default API;
