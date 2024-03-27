// RoleContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const RolesContext = createContext();
export const RoleProvider = ({ children }) => {
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();

    const [role, setRole] = useState(null);

    useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                setRole(decodedToken.role);
            } catch (error) {
                toast.error('Error decoding JWT token:', error);
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, []);

    return (
        <RolesContext.Provider value={{ role, setRole }}>
            {children}
        </RolesContext.Provider>
    );
};

export const useRole = () => {
    return useContext(RolesContext);
};

