import { useState, useCallback } from 'react';

export function useHomeProvider() {
    const [state, setHomeState] = useState({
        videos: [],
        selectedVideo: null,
        isFavorite: false,
        favoriteList: [],
        token: '',
        searchPerformed: ''
    });
    
    const saveHomeState = useCallback((updates) => {
        setHomeState((prevState) => ({...prevState, ...updates}));
    },[]);

    return {
        state,
        saveHomeState
    }
}  