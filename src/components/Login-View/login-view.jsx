import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export const ModalLogin = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        }
        fetch('http://localhost:8080/login', {
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
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card className='border-0'>
                        <Card.Body>
                            <Form id='login-form' onSubmit={handleSubmit}>
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

                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <div className='me-auto'>
                    <Button
                        form='login-form'
                        type='submit'
                        variant='primary'
                    >
                        Login</Button>
                        </div>
                        <Link to ={'/signup'}>
                        <span>
                            Don't have an account?
                    </span>
                    </Link>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

