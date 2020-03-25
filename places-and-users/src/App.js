import React from 'react';
import { useState, useCallback } from 'react';
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Users from './app/users/pages/Users';
import NewPlace from './app/places/pages/NewPlace';
import NavHeader from './app/shared/navigation/navbar/NavHeader';
import UserPlaces from './app/places/pages/UserPlaces';
import UpdatePlace from './app/places/pages/UpdatePlace';
import Auth from './app/users/pages/Auth';
import { AppContext } from './app/shared/app-contexts/app-contexts';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Route path='/places/:placeId' exact>
          <UpdatePlace />
        </Route>
        <Redirect to='/'/>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places'>
          <UserPlaces />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth'/>
      </Switch>
    );
  }

  return (
    <AppContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <AppRouter>
        <NavHeader />
        {routes}
      </AppRouter>
    </AppContext.Provider>
  );
}

export default App;
