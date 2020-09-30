import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import './HeaderComponent.scss';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '5px',
  },
  title: {
    flexGrow: 2,
  },
  appBar: {
    background: '#b6051a',
    height: '60px',
  },
  spacingMenuItem: {
    top: '45px',
  },
};

const HeaderComponent = (props) => {
    const {
      isLoggedIn,
      classes,
      handleRegOpen,
      handleLogOpen,
      handleCloseSession,
    } = props;

    return (
      <div className={classes.root}>
        <AppBar id="barColor" className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={props.onMenuClick}
            >
              <MenuIcon />
              <span className="brand1">Wize</span>
              <span style={{ fontSize: '20px' }} className="brand2">
                Tube
              </span>
            </IconButton>
            <Typography variant="h6" className={classes.title} />
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
                  <Button id="loginBtn" color="inherit" onClick={handleLogOpen}>
                    Login
                </Button>
                  <Button id="registerBtn" color="inherit" onClick={handleRegOpen}>
                    Register
                </Button>
                </div>
              )}
          </Toolbar>
        </AppBar>
      </div>
    );
}

export default withStyles(styles)(HeaderComponent);
