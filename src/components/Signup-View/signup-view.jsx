import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import CardHeader from "react-bootstrap/esm/CardHeader";

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
        <Container>
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <Card className="border-0">
                        <Card.Body>
                            <Card.Title className='mb-2'>Create an account</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='mb-2' controlId='formUsername'>
                                    <Form.Control
                                        type='text'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        minLength='3'
                                        placeholder='Username'
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className='mb-2' controlId='formPassword'>

                                    <Form.Control
                                        type='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder='Password'
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className='mb-2' controlId='formEmail'>

                                    <Form.Control
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Email address'
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className='mb-2' controlId='formBirthday'>

                                    <Form.Control
                                        type='date'
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        placeholder="Birthday"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className='mb-2' controlId='formCity'>

                                    <Form.Control
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="City"
                                    />
                                </Form.Group>
                                <Button
                                    type="submit"
                                    variant='primary'

                                >Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}