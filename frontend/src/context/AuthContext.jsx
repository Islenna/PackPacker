import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("usertoken") || null);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

    const login = (token, userData) => {
        setToken(token);
        setUser(userData);
        localStorage.setItem("usertoken", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("usertoken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
