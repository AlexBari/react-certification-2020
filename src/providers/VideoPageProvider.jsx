import React, { useContext, createContext } from 'react';
import { useHomeProvider } from '../hooks/home.hook';

const VideoPageContext = createContext();

export const VideoPageProvider = ({ children }) => {
    const home = useHomeProvider();
    return <VideoPageContext.Provider value={home}>{children}</VideoPageContext.Provider>;
};

export const useVideoContext = () => {
    return useContext(VideoPageContext);
}
