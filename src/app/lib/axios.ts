import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: "https://ton-war.bytebuffer.co",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;