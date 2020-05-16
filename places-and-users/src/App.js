import React from "react";
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./App.css";

import Users from "./app/users/pages/Users";
import NewPlace from "./app/places/pages/NewPlace";
import NavHeader from "./app/shared/navigation/navbar/NavHeader";
import UserPlaces from "./app/places/pages/UserPlaces";
import UpdatePlace from "./app/places/pages/UpdatePlace";
import Auth from "./app/users/pages/Auth";
import { AppContext } from "./app/shared/app-contexts/app-contexts";
import { useAppAuth } from "./app/app-hooks/auth-hook";

const App = () => {
  const { token, login, logout, usedIdLoggedIn } = useAppAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !!token,
        usedIdLoggedIn: usedIdLoggedIn,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <AppRouter>
        <NavHeader />
        {routes}
      </AppRouter>
    </AppContext.Provider>
  );
};

export default App;
