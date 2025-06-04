import React from 'react'
import { useState } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';




export const LoginView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        }
        fetch('https://my-vintage-flix-06cde8de3bcb.herokuapp.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.User) {
                    localStorage.setItem("user", JSON.stringify(data.User));
                    localStorage.setItem("token", data.Token);
                    onLoggedIn(data.User, data.Token);
                } else {
                    alert('User does not exist')
                }
            })
            .catch((e) => {
                alert('Something is wrong' + e);
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength='3'
                    required
                />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Button
                type='submit'
                variant='outline-dark'>
                    Login</Button>
        </Form>
    )
}