import React, { useContext, createContext } from 'react';
import { useUI } from '../hooks/ui.hook';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const ui = useUI();
    return <UIContext.Provider value={ui}>{children}</UIContext.Provider>;
};

export const useUIContext = () => {
    return useContext(UIContext);
}
