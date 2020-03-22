import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './NavHeader.css';

const NavHeader = (props) => {
  

  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" >
        <Navbar.Brand >Places n Users</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className='p-2' to='/' exact>All Users</NavLink>
            <NavLink className='p-2' to='/u1/places' exact>My Place</NavLink>
            <NavLink className='p-2' to='/places/new' exact>Add Place</NavLink>
            <NavLink className='p-2' to='/auth' exact>Authenticate</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
}

export default NavHeader;
