import { useState, useCallback } from 'react';

export function useUI() {
    const [isLogOpened, setLoginDialog] = useState(false);
    const [isRegOpened, setRegDialog] = useState(false);
    
    const setLogState = useCallback(
        (flag) => {
            setLoginDialog(flag);
        }, [setLoginDialog]);

    const setRegState = useCallback(
        (flag) => {
            setRegDialog(flag);
        }, [setRegDialog]);

    return {
        isLogOpened,
        isRegOpened,
        setRegState,
        setLogState
    }
}  