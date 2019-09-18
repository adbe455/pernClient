import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hideToggle, setHideToggle] = useState(true);

    let handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then( res => res.json())
        .then(data => {
            props.tokenHandler(data.sessionToken);
            console.log('Session token: ' + data.sessionToken)
        })
    }

    return(
        <Form style={{marginTop: '10vh'}} className="mx-auto col-lg-4">
            <FormGroup>
                <Label for="username">Username</Label>
                <Input onChange={(e) => setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
            <InputGroup>
                <Input onChange={(e) => setPassword(e.target.value)} type={hideToggle ? "password" : ""}/>
                <InputGroupAddon addonType="append">
                    <Button onClick={(e) => {e.preventDefault(); setHideToggle(!hideToggle)}}>
                    {hideToggle ? 'Show' : 'Hide'}
                    </Button>
                </InputGroupAddon>
            </InputGroup>
            </FormGroup>
            <FormGroup className="text-center">
                <Button onClick={(e) => handleSubmit(e)}>Login</Button>
            </FormGroup>
        </Form>    
    )
}

export default Login;