import { useState } from 'react';

export function useHomeProvider() {
    const [state, setHomeState] = useState({
        videos: [],
        selectedVideo: null,
        isFavorite: false,
        favoriteList: [],
        token: '',
        searchPerformed: ''
    });

    const saveHomeState = (updates) => {
        setHomeState((prevState) => ({...prevState, ...updates}));
    }

    return {
        state,
        saveHomeState
    }
}  