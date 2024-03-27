import { createContext, useContext, useEffect, useState } from 'react';
import { userTransaction } from '../../../../services/Apis';
import { toast } from 'react-toastify';
import { UserContext } from '../../../../pages/userContext/Usercontext';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await userTransaction(userData.id);
            if (response.status === 200) {
                setBalance(response.data.balance)
            }
        } catch (error) {
            toast.error('JWT token is not present');
        }
    }

    return (
        <WalletContext.Provider value={{ balance, setBalance }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    return useContext(WalletContext);
};
