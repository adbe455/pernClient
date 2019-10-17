import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import '../styles.css';
import { Link } from 'react-router-dom'

const Header = (props) => {

  return (
    <Navbar sticky={'top'} style={{borderBottom:'solid 1px white'}} className="red" light expand="md">
      <NavbarBrand tag={Link} to='/' >Critical Hits </NavbarBrand>
        { props.token ? 
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/* the props below originate from localstorage, they are set in a useState in Main.js and then passed in here
              this displays the firstName and lastName on the right side of the navbar in uppercase letters if they are logged in*/}
              <NavLink style={{color:'black', marginRight:'10px'}}>{props.firstName.toUpperCase() + ' ' + props.lastName.toUpperCase()}</NavLink>
            </NavItem> {}
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