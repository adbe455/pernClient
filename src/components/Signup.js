import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Redirect } from 'react-router-dom';


const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hideToggle, setHideToggle] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [signupAttempt, setSignupAttempt] = useState(false);

    // const serverUrl = 'http://localhost:3000'
    const serverUrl = 'https://pernproject.herokuapp.com'

    let handleSubmit = (event) => {
        event.preventDefault();

        fetch(serverUrl + '/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password
                }
            })
        }).then( res => res.json())
        .then(data => {
            props.tokenHandler(data.sessionToken);
            console.log('Session token: ' + data.sessionToken);
            localStorage.setItem('SessionToken', data.sessionToken)
            if(data.sessionToken){
                setRedirect(true);
            } else {
                setSignupAttempt(true);
            }
        })
    }

    return(
        <Form style={{marginTop: '10vh'}} className="mx-auto col-lg-4">
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input onChange={(e) => setFirstName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input onChange={(e) => setLastName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
            <InputGroup>
                <Input onKeyPress={e => {if(e.key === 'Enter' && firstName && lastName && email && password.length >= 5) { handleSubmit(e) }}} onChange={(e) => setPassword(e.target.value)} type={hideToggle ? "password" : ""}/>
                <InputGroupAddon addonType="append">
                    <Button style={{backgroundColor: '#88304E'}} onClick={(e) => {e.preventDefault(); setHideToggle(!hideToggle)}}>
                        {hideToggle ? 'Show' : 'Hide'}
                    </Button>
                    {redirect ? <Redirect to='/'/> : null}
                </InputGroupAddon>
            </InputGroup>
            {password.length > 0 && password.length < 5 ? <p className='text-center'>Password must be at least 5 characters</p> : null}
            </FormGroup>
            <FormGroup className="text-center">
                {firstName && lastName && email && password.length >= 5 ? <Button style={{backgroundColor: '#88304E'}} onClick={(e) => handleSubmit(e)}>Sign Up</Button> : null}
            </FormGroup>
        </Form>    
    )
}

export default Signup;