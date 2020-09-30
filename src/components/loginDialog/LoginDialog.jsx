import React, { useState, useCallback } from 'react';
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

const LoginDialog = (props) => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [hasError, setError] = useState(false);
  const auth = useAuth();

  const handleUser = useCallback((e) => {
    const { value } = e.target;
    setEmail(value);
  },[setEmail]);

  const handlePassword = useCallback((e) => {
    const { value } = e.target;
    setPassword(value);
  },[setPassword]);

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    auth.loginSession(email, password)
      .then(() => {
        props.handleClose();
      })
      .catch((error) => {
        setError(true);
      });
  };
  
  return (
    <div>
      <Dialog
        open={props.isOpened}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          {hasError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <span>Please verify your credentials!</span>
            </Alert>
          )}
          <form onSubmit={(e) => signInWithEmailAndPasswordHandler(e)}>
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
            <DivWrapper>
              <Button id="sbtLogin" type="submit" color="primary">
                Login
              </Button>
              <Button id="cnlLogin" type="Abort" color="primary" onClick={props.handleClose}>
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

export default LoginDialog;
