import React, { useState } from 'react';
import { Dialog, DialogTitle, Button, DialogContent, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAuth } from '../../hooks/auth.hook';

const RegisterDialog = (props) => {
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [hasError, setError] = useState(false);
  const [msgError, setMsgError] = useState('');
  const { isOpened, handleRegClose, handleRegister } = props;
  const auth = useAuth();
  const handleUser = (e) => {
    const { value } = e.target;
    setDisplayName(value);
  };
  const handlePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const handleEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const createUserWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();
    await auth
      .registerUser(email, password, displayName)
      .then(({ displayName, email, password }) => {
        handleRegister(displayName, email, password);
      })
      .catch((error) => {
        setMsgError(error.message);
        resetFields();
        setError(true);
      });
    resetFields();
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  return (
    <div>
      <Dialog
        open={isOpened}
        onClose={handleRegClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent style={{ maxWidth: '380px' }}>
          {hasError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <span>{msgError}</span>
            </Alert>
          )}
          <form onSubmit={createUserWithEmailAndPasswordHandler}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={handleEmail}
              value={email}
              required
            />
            <TextField
              margin="dense"
              id="name"
              label="User"
              type="text"
              fullWidth
              onChange={handleUser}
              value={displayName}
              required
            />
            <TextField
              margin="dense"
              id="pass"
              label="Password"
              type="password"
              fullWidth
              onChange={handlePassword}
              value={password}
              required
            />
            <div style={{ padding: '5px 0', textAlign: 'center' }}>
              <Button id="sbtReg" type="submit" color="primary">
                Sign in
              </Button>
              <Button
                id="cnlReg"
                type="Abort"
                color="primary"
                onClick={(e) => handleRegClose(e, displayName, password, email)}
              >
                Cancel
              </Button>
            </div>
            <div style={{ padding: '5px 0', textAlign: 'center' }}>
              <span>- or -</span>
            </div>
            <div style={{ padding: '5px 0', textAlign: 'center' }}>
              <Button
                id="sbtGoogle"
                color="primary"
                style={{ border: '1px solid lightgray', width: '300px' }}
                onClick={auth.signUpWithGoogle}
              >
                <span style={{ color: '#4285F4', marginRight: '3px' }}>Sign </span>
                <span style={{ color: '#DB4437', marginRight: '3px' }}>in </span>
                <span style={{ color: '#F4B400', marginRight: '3px' }}>with </span>
                <span style={{ color: '#0F9D58' }}>Google</span>
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
