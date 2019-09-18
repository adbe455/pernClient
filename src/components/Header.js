import React, { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import '../styles.css';
import Logout from './Logout';
// import Login from './Login';
import { Link } from 'react-router-dom'


const Header = (props) => {

  return (
    <Navbar className="red" light expand="md">
      <NavbarBrand href="/">Game Critic</NavbarBrand>
          {props.token ? 
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Logout/>
            </NavItem>
          </Nav> : 
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/login" className="nav-item">Log In</Link>
            </NavItem>
            <NavItem>
              <Link to="/signup" className="nav-item" >Sign Up</Link>
            </NavItem>
          </Nav>}
    </Navbar>
  );
}

export default Header;