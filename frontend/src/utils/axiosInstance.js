import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true, // 🔑 Include cookies like refresh_token
});

// Attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor with token refresh logic
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error?.response?.status;

        if ((status === 401 || status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axiosInstance.post("/user/refresh"); // refresh_token sent via cookie
                const newToken = res.data.access_token;

                localStorage.setItem("token", newToken);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshErr) {
                console.error("Token refresh failed:", refreshErr);
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem("token");
                window.location.href = "/";
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
