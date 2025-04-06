import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    const [usertoken, setToken] = useState(() => localStorage.getItem("usertoken") || null);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

    const login = (usertoken, userData) => {
        setToken(usertoken);
        setUser(userData);
        localStorage.setItem("usertoken", usertoken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userRole", userData.role);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("usertoken");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ usertoken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
