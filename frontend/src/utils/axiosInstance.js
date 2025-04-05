import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Attach token globally (in case interceptor fails to persist during CORS preflight)
const token = localStorage.getItem("usertoken");
if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log("✅ Set default Authorization header:", axiosInstance.defaults.headers.common['Authorization']);
} else {
    console.warn("⚠️ No token in localStorage, cannot set default Authorization");
}

// Also still use interceptor just in case
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("usertoken");
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
        console.log("✅ Interceptor added token:", config.headers.Authorization);
    }
    return config;
});

export default axiosInstance;
