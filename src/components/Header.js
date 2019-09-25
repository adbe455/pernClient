import React, { useState } from 'react';
import {
    Button,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import '../styles.css';
import { Link } from 'react-router-dom'
// import Login from './Login';
// import { userInfo } from 'os';
// import { stringify } from 'querystring';

const Header = (props) => {

  return (
    <Navbar sticky={'top'} className="red" light expand="md">
      <NavbarBrand tag={Link} to='/' >Critical Hits </NavbarBrand>
        { props.token ? 
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink>{props.firstName.toUpperCase() + ' ' + props.lastName.toUpperCase()}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='' onClick={() => {props.clearToken()}}>Logout</NavLink>
            </NavItem>
          </Nav> : 
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/login">Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/signup">Sign Up</NavLink>
            </NavItem>
          </Nav>}
    </Navbar>
  );
}

export default Header;