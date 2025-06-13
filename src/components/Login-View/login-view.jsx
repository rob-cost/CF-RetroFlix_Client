import Button from 'react-bootstrap/Button';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Form, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const ModalLogin = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => toast('Username or Password incorrect', {
    position:'top-center'
  });

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
          notify()
        }
      })
      .catch((e) => {
        alert('Something is wrong' + e);
      });
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
      <Col md={6} >
      <Card className='login-card border-0'>
        <Card.Body>
          <Card.Title className='mb-5 text-center'>Welcome to <h1>RetroFlix</h1> </Card.Title>
          <Form id='login-form' onSubmit={handleSubmit}>
            <Form.Group className='mb-4' controlId='formUsername'>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength='3'
                placeholder='Username'
                required
              />
            </Form.Group>
            <Form.Group className='mb-4' controlId='formPassword'>
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
        <div className="d-flex justify-content-end mb-2">
          <Button
            form='login-form'
            type='submit'
            variant='primary'
          >
            Login</Button>
            <ToastContainer autoClose={false}/>
        </div>
        <div className="d-flex justify-content-end mb-2">
          <Link className='custom-link' to={'/signup'}>
            <span>
              Don't have an account?
            </span>
          </Link>
        </div>
      </Card>
      </Col>
      </Row>
    </Container>

  );
}

