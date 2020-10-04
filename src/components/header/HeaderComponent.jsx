import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';

const DivWrapper = styled.div`
  flex-grow: 1;
  .MuiAppBar-colorPrimary {
    background: #b6051a !important;
    height: 60px;
  }
  .btn--menu {
    margin-right: '5px';
  }
  .wrapper__btns {
  margin-left: 40%;
  }
  .wrapper__logo{
    margin-right: 41%;
  }
`;

const HeaderComponent = (props) => {
  const { isLoggedIn, handleCloseSession } = props;

  return (
    <DivWrapper>
      <AppBar id="barColor" position="static">
        <Toolbar>
          <div className="wrapper__logo">
            <IconButton
              edge="start"
              className="btn--menu"
              color="inherit"
              aria-label="Menu"
              onClick={props.onMenuClick}
            >
              <MenuIcon />
              <span className="brand1">Wize</span>
              <span className="brand2">
                Tube
              </span>
            </IconButton>
          </div>
          <div className="wrapper__btns">
            {isLoggedIn ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Button id="logoutBtn" color="inherit" onClick={handleCloseSession}>
                  Logout
                </Button>
              </div>
            ) : (
                <div>
                  <Button id="loginBtn" color="inherit" onClick={props.handleLogOpen}>
                    Login
                  </Button>
                  <Button id="registerBtn" color="inherit" onClick={props.handleRegOpen}>
                    Register
                </Button>
                </div>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </DivWrapper>
  );
}

export default HeaderComponent;
