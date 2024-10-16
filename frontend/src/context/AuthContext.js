import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const loginUser = (userData) => {
        setUser(userData.user);
        setToken(userData.access_token);
    };

    const logoutUser = () => {
        setUser(null);
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
