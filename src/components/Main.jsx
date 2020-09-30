import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HeaderComponent from './header/HeaderComponent';
import SideBar from './sideBar/SideBarComponent';
import LoginDialog from './loginDialog/LoginDialog';
import RegisterDialog from './registerDialog/RegisterDialog';
import { HomePage, FavoritesPage } from '../pages/index';
import PrivateRoute from './PrivateRouter';
import { useAuth } from '../providers/AuthProvider';

function Main({ variant }) {
  const auth = useAuth();
  const [drawer, setDrawer] = useState(false);
  const [isLogOpened, setLoginDialog] = useState(false);
  const [isRegOpened, setRegDialog] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const toggleDrawer = () => {
    if (isLoggedIn) setDrawer(!drawer);
  };

  const onItemClick = () => () => {
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };

  useEffect(() => {
    if (auth.user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setLoginDialog(false);
    setRegDialog(false);
  }, [auth.user]);

  const handleLogOpen = () => {
    setLoginDialog(true);
  };

  const handleRegOpen = () => {
    setRegDialog(true);
  };

  const handleLogClose = (e) => {
    e.preventDefault();
    setLoginDialog(false);
  };

  const handleRegClose = (e) => {
    e.preventDefault();
    setRegDialog(false);
  };

  const handleLogin = (e, usr, password) => {
    if (usr && password) {
      setLoginDialog(false);
    }
  };

  const handleRegister = (e, user, password, email) => {
    if (user && password && email) {
      setRegDialog(false);
    }
  };

  const handleLogout = () => {
    auth.logoutSession();
    setLogin(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent
          onMenuClick={toggleDrawer}
          isLoggedIn={isLoggedIn}
          handleRegOpen={handleRegOpen}
          handleLogOpen={handleLogOpen}
          handleCloseSession={handleLogout}
        />
        <SideBar
          open={drawer}
          onClose={toggleDrawer}
          onItemClick={onItemClick}
          variant={variant}
        />
        <LoginDialog
          isOpened={isLogOpened}
          handleLogClose={handleLogClose}
          handleLogin={handleLogin}
        />
        <RegisterDialog
          isOpened={isRegOpened}
          handleRegClose={handleRegClose}
          handleRegister={handleRegister}
        />
        <div className="spacing-component">
          <Switch>
            <PrivateRoute
              authed={isLoggedIn}
              path="/favorites"
              component={FavoritesPage}
            />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Main;
