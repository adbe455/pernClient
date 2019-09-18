import React, { useState } from 'react';
import {
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom'
import '../styles.css';

const Auth = (props) => {
    let [login, setLogin] = useState(true);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');


    let changeLogin = (e) => {
        e.preventDefault();
        setLogin(!login)

        setUsername('');
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        let url = login ? 'http://localhost:3000/user/login' : 'http://localhost:3000/user/signup'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        }).then( res => res.json())
        .then(data => {
            props.tokenHandler(data.sessionToken);
            console.log('Session token: ' + data.sessionToken)
        })
    }
    return(
        <Nav className="ml-auto" navbar>
            <NavItem>
                <Link to="/login" className="nav-item">Log In</Link>
            </NavItem>
            <NavItem>
                <Link to="/signup" className="nav-item">Sign Up</Link>
            </NavItem>
        </Nav>
    )
}

export default Auth;