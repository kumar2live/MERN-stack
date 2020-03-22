import React from 'react';
import { BrowserRouter as AppRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Users from './app/users/pages/Users';
import NewPlace from './app/places/pages/NewPlace';
import NavHeader from './app/shared/navigation/navbar/NavHeader';
import UserPlaces from './app/places/pages/UserPlaces';

const App = () => {
  return (
    <AppRouter>
      <NavHeader />

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
        <Redirect to='/'/>
      </Switch>
    </AppRouter>
  );
}

export default App;
