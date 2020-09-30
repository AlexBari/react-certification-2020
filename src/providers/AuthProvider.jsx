
import React, { useContext, createContext } from 'react';
import { useProvideAuth } from '../hooks/auth.hook'

const UserProvider = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <UserProvider.Provider value={auth}>{children}</UserProvider.Provider>;
}

export const useAuth = () => {
    return useContext(UserProvider);
};