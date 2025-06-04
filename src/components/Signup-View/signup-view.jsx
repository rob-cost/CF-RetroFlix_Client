import React from "react";
import { useState } from "react";
import {Form, Button} from "react-bootstrap"

export const SignupView = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [city, setCity] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
            City: city
        };

        fetch('https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert('Signup successful');
                    window.location.reload();
                } else {
                    alert('Signup failed')
                }
            })
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength='3'
                    required
                />
            </Form.Group>

            <Form.Group controlId='formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId='formCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </Form.Group>
            <Button
                type="submit"
                variant='outline-dark'
            >Submit</Button>
        </Form>
    )
}