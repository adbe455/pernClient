import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Redirect } from 'react-router-dom';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hideToggle, setHideToggle] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [loginAttempt, setLoginAttempt] = useState(false);

    const serverUrl = 'http://localhost:3000'
    // const serverUrl = 'https://pernproject.herokuapp.com'
    
    let handleSubmit = (event) => {
        console.log('login server url: ' + serverUrl)
        event.preventDefault();
        
        fetch(serverUrl + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email,
                    password: password
                }
            })
        }).then( res => res.json())
        .then(data => {
            props.tokenHandler(data.sessionToken);
            console.log('login data: ', data);
            localStorage.setItem('SessionToken', data.sessionToken);
            localStorage.setItem('FirstName', data.user.firstname);
            localStorage.setItem('LastName', data.user.lastname);
            if(data.sessionToken) {
                setRedirect(true);
            } else {
                setLoginAttempt(true);
            }
        })
    }

    return(
        <Form style={{marginTop: '10vh'}} className="mx-auto col-lg-4">
            <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
            <InputGroup>
                <Input onKeyPress={e => {if(e.key === 'Enter' && email && password) { handleSubmit(e) }}} onChange={(e) => setPassword(e.target.value)} type={hideToggle ? "password" : ""}/>
                <InputGroupAddon addonType="append">
                    <Button style={{backgroundColor: '#88304E'}} onClick={(e) => {e.preventDefault(); setHideToggle(!hideToggle)}}>
                        {hideToggle ? 'Show' : 'Hide'}
                    </Button>
                    {redirect ? <Redirect to='/'/> : null}
                </InputGroupAddon>
            </InputGroup>
            </FormGroup>
            <FormGroup className="text-center">
                {email && password ? <Button style={{backgroundColor: '#88304E'}} onClick={(e) => handleSubmit(e)}>Login</Button> : null}
            </FormGroup>
            {loginAttempt ? <p className="text-center">Incorrect login credentials</p> : null}
        </Form>    
    )
}

export default Login;