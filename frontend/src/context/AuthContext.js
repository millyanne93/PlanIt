import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      console.log('Retrieved token from localStorage:', storedToken);
  
      const storedUser = localStorage.getItem('user');
      console.log('Retrieved user from localStorage:', storedUser);

      try {
        setUser(storedUser ? JSON.parse(storedUser) : null);  // Parse only if user exists
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);  // Fallback in case of error
      }

      setToken(storedToken);  // Set the token as usual
    }, []);

    const loginUser = (userData) => {
        // Log the full response for debugging purposes
        console.log('Full response from login:', userData);

        // Check if userData exists and has the expected properties
        if (userData && userData.access_token) {
            // Store token and user data (check if the user property exists in the response)
            const user = userData.user || {};  // Default to an empty object if userData.user is undefined
            const token = userData.access_token;

            // Update state with user and token
            setUser(user);
            setToken(token);

            // Log to verify data stored in state
            console.log('Token generated and stored:', token);
            console.log('User data stored:', user);

            // Store token and user data in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            // Log an error if the expected properties are missing
            console.error('Invalid login response, missing token or user:', userData);
        }
    };
 

    const logoutUser = () => {
        setUser(null);
        setToken('');
        console.log('User logged out, token cleared');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
