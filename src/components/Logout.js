import React from 'react';
// import {
//     NavLink
// } from 'reactstrap';
import { Link } from 'react-router-dom'
import '../styles.css';

const Logout = (props) => {
    return(
        <Link to='/' className="nav-item" onClick={props.logout}>Logout</Link>
    )
}

export default Logout;