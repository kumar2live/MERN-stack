import React from 'react';
import {BrowserRouter as AppRouter, Route, Redirect, Switch } from 'react-router-dom';

import Users from './users/pages/Users';
import Places from './places/pages/Places';
import NewPlace from './places/pages/NewPlace';

import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return (
    <AppRouter>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/places'>
            <Places />
          </Route>
          <Route path='/places/new'>
            <NewPlace />
          </Route>
          <Route path='/' exact>
            <Users />
          </Route>
          <Redirect to='/'/>
        </Switch>
      </main>
    </AppRouter>
  );
}

export default App;
