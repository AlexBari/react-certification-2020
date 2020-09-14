import React, { useState } from 'react';
import { Dialog, DialogTitle, Button, DialogContent, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAuth } from '../../hooks/auth.hook';

const LoginDialog = (props) => {
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [hasError, setError]  = useState(false);
    const auth = useAuth();
    const handleUser = (e) => {
        const value = e.target.value
        setEmail(value);
    }
    const handlePassword = (e) => {
        const value = e.target.value
        setPassword(value);
    }

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.loginSession(email, password)
        .catch(error => {
          console.error("Error signing in with password and email", error);
          setError(true)
        }, handleLogin(email, password));
      };

    const { isOpened, handleLogClose, handleLogin } = props;
    return (
        <div>
            <Dialog open={isOpened} onClose={handleLogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    {hasError && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            <span>Please verify your credentials!</span>
                        </Alert>
                    )}
                    <form onSubmit={(e) => signInWithEmailAndPasswordHandler(e, email, password)}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email"
                            type="text"
                            fullWidth
                            onChange={handleUser}
                        />
                        <TextField
                            margin="dense"
                            id="pass"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={handlePassword}
                        />
                        <div style={{ padding: '5px 0', textAlign: 'end' }}>
                            <Button id="sbtGoogle" color="primary" onClick={auth.signInWithGoogle}>
                                Login in with Google
                            </Button>
                            <Button id="sbtLogin" type="submit" color="primary">
                                Login
                            </Button>
                            <Button id="cnlLogin" type="Abort" color="primary" onClick={handleLogClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default LoginDialog;