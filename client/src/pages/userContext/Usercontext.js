import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const authToken = localStorage.getItem('authToken');
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                setUserData(decodedToken);
            } catch (error) {
                console.error('Error decoding JWT token:', error);
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [authToken, navigate]);
    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    );
}

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};