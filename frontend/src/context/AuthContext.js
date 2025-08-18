import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        try {
            let parsedUser = null;
            if (storedUser) {
                parsedUser = JSON.parse(storedUser);
            }

            // Set state
            setUser(parsedUser);
            setToken(storedToken || '');
        } catch (error) {
            setUser(null);
            setToken('');
            // Clear corrupted data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    }, []);

    const loginUser = (userData) => {
        if (userData && userData.access_token) {
            const userObj = userData.user || {};
            const tokenStr = userData.access_token;

            // Update state
            setUser(userObj);
            setToken(tokenStr);

            // Save to localStorage
            localStorage.setItem('token', tokenStr);
            localStorage.setItem('user', JSON.stringify(userObj));
        } else {
            // Optional: handle login failure silently
        }
    };

    const logoutUser = () => {
        // Clear state
        setUser(null);
        setToken('');

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const contextValue = {
        user,
        token,
        loading,
        loginUser,
        logoutUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

