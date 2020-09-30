import { useState, useEffect, useCallback } from 'react';

export function useUI() {
    const [isLogOpened, setLoginDialog] = useState(false);
    const [isRegOpened, setRegDialog] = useState(false);
    
    const setLogState = useCallback(
        (flag) => {
            setLoginDialog(flag);
        }, []);

    const setRegState = useCallback(
        (flag) => {
            setRegDialog(flag);
        }, []);

    useEffect(() => {
        console.log('inside the hook: ', isLogOpened)
    }, [isLogOpened]);

    return {
        isLogOpened,
        isRegOpened,
        setRegState,
        setLogState
    }
}  