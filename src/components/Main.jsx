import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HeaderComponent from './header/HeaderComponent';
import SideBar from './sideBar/SideBarComponent';
import LoginDialog from './loginDialog/LoginDialog';
import RegisterDialog from './registerDialog/RegisterDialog';
import FavoritesPage from '../pages/FavoritesPage';
import HomePage from '../pages/HomePage';
import PrivateRoute from './PrivateRouter';
import { useAuth } from '../providers/AuthProvider';
import { useUI } from '../hooks/ui.hook';
import styled from 'styled-components';

const AppWrapper = styled.div`
  text-align: center;
  transition: background-color 0.3s ease;
  .spacing-component {
    padding: 15px 10px;
    height: auto;
    overflow: auto;
  }
  #sideBar--item {
    border-bottom: 1px solid #b4b4b4;
  }
  #sideBar .MuiPaper-root a:focus,
  #sideBar .MuiPaper-root a:hover {
    background-color: #7c7c7c;
  }
  #sideBar .MuiPaper-root a:active {
    background-color: #aaaaaa;
  }
  .brand1 {
    color: black;
    margin-left: 5px;
    font-weight: bolder;
    padding: 5px;
  }
  .brand2 {
    background-color: rgb(224, 102, 102);
    padding: 5px;
    border-radius: 5px;
    color: white;
    font-size: 20px;
  }
`;

function Main({ variant }) {
  const auth = useAuth();
  const { isLogOpened, isRegOpened, setLogState, setRegState } = useUI();
  const [drawer, setDrawer] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);

  const toggleDrawer = () => {
   setDrawer(!drawer);
  };

  const onItemClick = () => () => {
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };

  const handleLogout = () => {
    auth.logoutSession();
    setLogin(false);
  };


  useEffect(() => {
    if (auth.user) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setLogState(false);
    setRegState(false);
  }, [auth.user, setLogState, setRegState]);

  return (
    <AppWrapper>
      <BrowserRouter>
        <HeaderComponent
          onMenuClick={toggleDrawer}
          isLoggedIn={isLoggedIn}
          handleCloseSession={handleLogout}
          handleLogOpen={(e) => setLogState(true)}
          handleRegOpen={(e) => setRegState(true)}
        />
        <SideBar
          open={drawer}
          onClose={toggleDrawer}
          onItemClick={onItemClick}
          variant={variant}
        />
        <LoginDialog isOpened={isLogOpened} handleClose={(e) =>  setLogState(false)} />
        <RegisterDialog isOpened={isRegOpened} handleClose={(e) =>  setRegState(false)} />
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
    </AppWrapper>
  );
}

export default Main;
