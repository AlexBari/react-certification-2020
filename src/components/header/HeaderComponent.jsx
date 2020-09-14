import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Switch, IconButton, FormControlLabel, FormGroup } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from '../searchBar/SearchBarComponent'
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
        height: '60px'

    },
    spacingMenuItem: {
        top: '45px'
    },
    searchIcon: {
      padding: '1px 5px',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    search: {
      position: 'relative',
      borderRadius: '5px',
      backgroundColor: 'rgba(255, 255, 255, .15)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .25) ',
      },
      marginLeft: 0,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: '8px 8px 8px 0px',
      paddingLeft: `calc(1em + 32px)`,
    },
};

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            isDarkMode: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
    }

    handleChange(event) {
        const value = event.target.checked;
        this.setState((prevState) => ({
            ...prevState,
            isDarkMode: value
        }), this.props.changeColorMode(!this.state.isDarkMode));
    };

    handleMenu(event) {
        const value = event.currentTarget;
        this.setState((prevState) => ({
            ...prevState,
            anchorEl: value
        }));
    }

    handleClose() {
        this.setState((prevState) => ({
            ...prevState,
            anchorEl: null
        }));
    }

    render() {
        const {  anchorEl, isDarkMode } = this.state;
        const { isLoggedIn,classes, handleRegOpen, handleLogOpen, handleCloseSession, title } = this.props;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar id="barColor" className={classes.appBar} position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu"
                            onClick={this.props.onMenuClick}>
                            <MenuIcon />
                        </IconButton>
                        { isLoggedIn && (
                            <SearchBar classes={classes} />
                        )}
                        <Typography variant="h6" className={classes.title}>
                            {title}
                        </Typography>
                        { isLoggedIn
                            ?
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem>
                                     <Link to='/profile'>
                                        My account
                                     </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        Dark Mode
                                        <FormGroup style={{marginLeft: '10px'}}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={isDarkMode}
                                                        onChange={this.handleChange}
                                                        aria-label="Dark Mode"
                                                    />
                                                }
                                            />
                                        </FormGroup>
                                    </MenuItem>
                                </Menu>
                                <Button id="logoutBtn" color="inherit" onClick={handleCloseSession}>Logout</Button>
                            </div>
                            :
                            <div>
                             <Button id="loginBtn" color="inherit" onClick={handleLogOpen}>Login</Button>
                             <Button id="registerBtn" color="inherit" onClick={handleRegOpen}>Register</Button>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderComponent);
