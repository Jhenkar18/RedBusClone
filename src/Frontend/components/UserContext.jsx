

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Context for the user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    // Load userId from localStorage when the component mounts
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const login = (id) => {
        setUserId(id);
        localStorage.setItem('userId', id);  // Save the userId to localStorage
    };

    const logout = () => {
        setUserId(null);
        localStorage.removeItem('userId');   // Remove the userId from localStorage
        localStorage.removeItem('token');    // Optionally remove the token as well
    };

    return (
        <UserContext.Provider value={{ userId, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
