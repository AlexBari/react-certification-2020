import React, { useState } from 'react';
import { Dialog, DialogTitle, Button, DialogContent, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useAuth } from '../../providers/AuthProvider';
import styled from 'styled-components';

const DivWrapper = styled.div`
  padding: 5px 0;
  text-align: center;
  #sbtGoogle {
    border: 1px solid lightgray;
    width: 300px;
  }
  .blueG { color: #4285F4; margin-right: 3px;}
  .redG { color: #DB4437; margin-right: 3px;}
  .yellowG { color: #F4B400; margin-right: 3px;}
  .greenG { color: #0F9D58; margin-right: 3px;}
`;

const RegisterDialog = (props) => {
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [hasError, setError] = useState(false);
  const [msgError, setMsgError] = useState('');

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
      .then(() =>props.handleClose())
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
        open={props.isOpened}
        onClose={props.handleClose}
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
            <DivWrapper>
              <Button id="sbtReg" type="submit" color="primary">
                Sign in
              </Button>
              <Button
                id="cnlReg"
                type="Abort"
                color="primary"
                onClick={props.handleClose}
              >
                Cancel
              </Button>
            </DivWrapper>
            <DivWrapper>
              <span>- or -</span>
            </DivWrapper>
            <DivWrapper>
              <Button
                id="sbtGoogle"
                color="primary"
                onClick={auth.signUpWithGoogle}
              >
                <span className="blueG">Sign </span>
                <span className="redG">in </span>
                <span className="yellowG">with </span>
                <span className="greenG">Google</span>
              </Button>
            </DivWrapper>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
