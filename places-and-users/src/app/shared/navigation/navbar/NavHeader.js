import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import "./NavHeader.css";
import { AppContext } from "../../app-contexts/app-contexts";

const NavHeader = (props) => {
  const appContext = useContext(AppContext);
  // console.log('appContext -- ', appContext)

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand>Places n Users</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="p-2" to="/" exact>
              All Users
            </NavLink>
            {appContext.isLoggedIn && (
              <NavLink
                className="p-2"
                to={`/${appContext.usedIdLoggedIn}/places`}
                exact
              >
                My Place
              </NavLink>
            )}
            {appContext.isLoggedIn && (
              <NavLink className="p-2" to="/places/new" exact>
                Add Place
              </NavLink>
            )}
            {!appContext.isLoggedIn && (
              <NavLink className="p-2" to="/auth" exact>
                Authenticate
              </NavLink>
            )}

            {appContext.isLoggedIn && (
              <Button variant="outline-secondary" onClick={appContext.logout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavHeader;
