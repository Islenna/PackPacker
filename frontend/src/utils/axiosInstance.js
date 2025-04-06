import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const usertoken = localStorage.getItem("usertoken");
        console.log("Token from localStorage:", usertoken); // Debugging line
        if (usertoken) {
            config.headers.Authorization = `Bearer ${usertoken}`;
        }
        return config;
        console.log("Request config:", config); // Debugging line
    },
    (error) => Promise.reject(error)
);

// 🔥 Handle expired or invalid tokens
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem("usertoken");
            // Optional: store current path if you want to redirect back
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
