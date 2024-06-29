import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend URL
    withCredentials: true, // Send cookies and other credentials if needed
});

export default axiosInstance;