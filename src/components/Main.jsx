import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HeaderComponent from './header/HeaderComponent';
import SideBar from './sideBar/SideBarComponent';
import LoginDialog from './loginDialog/LoginDialog';
import RegisterDialog from './registerDialog/RegisterDialog';
import { ProfilePage, HomePage } from '../pages/index';
import PrivateRoute from './PrivateRouter';
import { useAuth } from '../hooks/auth.hook';

function Main({ variant, userLogged }) {
    const [drawer, setDrawer] = useState(false);
    const [title, setTitle] = useState('Home');
    const [darkMode, setDarkMode] = useState(false);
    const [isLogOpened, setLoginDialog] = useState(false);
    const [isRegOpened, setRegDialog] = useState(false);
    const [isLoggedIn, setLogin] = useState(false);
    const auth = useAuth();

    const toggleDrawer = () => {
        setDrawer(!drawer);
    };

    const onItemClick = title => () => {
        setTitle(title);
        setDrawer(variant === 'temporary' ? false : drawer);
        setDrawer(!drawer);
    };

    // Effect call for dark mode theme change
    useEffect(
        () => {
            const className = 'dark-mode';
            const element = window.document.body;
            if (darkMode) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        }, [darkMode]);

    useEffect(() => {
        if (auth.user) {
            setLogin(true);
        } else {
            setLogin(false);
        }
        setLoginDialog(false);
        setRegDialog(false);
    }, [isLoggedIn, auth.user]);

    const handleLogOpen = () => {
        setLoginDialog(true);
    };

    const handleRegOpen = () => {
        setRegDialog(true);
    };

    const handleLogClose = (e) => {
        e.preventDefault();
        setLoginDialog(false);
    }

    const handleRegClose = (e) => {
        e.preventDefault();
        setRegDialog(false);
    }

    const handleLogin = (e, usr, password) => {
        if (usr && password) {
            setLoginDialog(false);
        }
    }

    const handleRegister = (e, user, password, email) => {
        if (user && password && email) {
            setRegDialog(false);
        }
    }

    const handleLogout = () => {
        auth.logoutSession()
        setLogin(false);
        setDarkMode(false);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent
                    title={title}
                    onMenuClick={toggleDrawer}
                    isLoggedIn={isLoggedIn}
                    handleRegOpen={handleRegOpen}
                    handleLogOpen={handleLogOpen}
                    handleCloseSession={handleLogout}
                    changeColorMode={setDarkMode}
                />
                <SideBar
                    open={drawer}
                    onClose={toggleDrawer}
                    onItemClick={onItemClick}
                    variant={variant}
                />
                <LoginDialog isOpened={isLogOpened} handleLogClose={handleLogClose} handleLogin={handleLogin} />
                <RegisterDialog isOpened={isRegOpened} handleRegClose={handleRegClose} handleRegister={handleRegister} />
                <div className="spacing-component">
                    <Switch>
                        <PrivateRoute authed={isLoggedIn} path='/profile' component={ProfilePage} />
                        <Route path='/' component={HomePage} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Main;
