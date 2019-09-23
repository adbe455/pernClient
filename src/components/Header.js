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
// import Login from './Login';
import { Link } from 'react-router-dom'


const Header = (props) => {

  return (
    <Navbar sticky={'top'} className="darkred" light expand="md">
      <NavbarBrand href="/">Game Critic</NavbarBrand>
        { props.token ? 
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className='nav-item' to='' onClick={() => {props.clearToken()}}>Logout</Link>
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