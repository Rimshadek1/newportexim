// RoleContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { userRole } from '../../services/Apis';
import { toast } from 'react-toastify';

const RolesContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await userRole();
            if (response.status === 200) {
                setRole(response.data.role);
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            toast.error('JWT token is not present role');
        }
    };

    return (
        <RolesContext.Provider value={{ role, setRole }}>
            {children}
        </RolesContext.Provider>
    );
};

export const useRole = () => {
    return useContext(RolesContext);
};
