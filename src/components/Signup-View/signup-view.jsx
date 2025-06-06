import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import CardHeader from "react-bootstrap/esm/CardHeader";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";

export const ModalSignup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [city, setCity] = useState('');

    const navigate = useNavigate();


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

        fetch('http://localhost:8080/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => {
                if (response.ok) {
                    alert('Signup successful');
                    navigate('/login');
                } else {
                    response.text().then((err)=>{
                        alert(err)
                    })
                }
            })
            .catch((err)=> {
                console.log('Error' + err)
            })
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Card className="border-0">
                        <Card.Body>
                            <Form id="signup-form" onSubmit={handleSubmit}>
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

                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>

                <Modal.Footer>
                    <div className="me-auto">
                    <Button
                        form="signup-form"
                        type="submit"
                        variant='primary'
                    >Submit</Button>
                    </div>
                    <Link to ={'/login'}>
                        <span>
                            Already have an account
                    </span>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}
