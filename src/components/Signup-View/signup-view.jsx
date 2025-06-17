import React from "react";
import { useState } from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { signupUser } from "../../connections/api";

export const ModalSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const notify = () => toast('Signup successful', {
      position:'top-center'
    });


  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
      City: city
    };
    try {
      const response = await signupUser(data);
      if (response.ok) {
        notify();
        navigate('/login')
      }
      else {
        response.text().then((err) => {
            alert(err)
          })
      }
    }
    catch (err) {
      console.alert('Error '+ err)
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col md={6}>
          <Card className="login-card border-0">
            <Card.Body>
              <Card.Title className='mb-5 text-center'>Welcome to <h1>RetroFlix</h1></Card.Title>
              <Form id="signup-form" onSubmit={handleSubmit}>
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

                <Form.Group className='mb-4' controlId='formEmail'>

                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email address'
                    required
                  />
                </Form.Group>

                <Form.Group className='mb-4' controlId='formBirthday'>

                  <Form.Control
                    type='date'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="Birthday"
                    required
                  />
                </Form.Group>

                <Form.Group className='mb-4' controlId='formCity'>

                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                  />
                </Form.Group>

              </Form>
            </Card.Body>
            <div className="d-flex justify-content-end mb-2">
              <Button
                form="signup-form"
                type="submit"
                variant='primary'
              >Submit</Button>
            </div>
            <ToastContainer autoclose={false} />
            <div className="d-flex justify-content-end mb-2">
            <Link to={'/login'}>
              <span>
                Already have an account
              </span>
            </Link>
            </div>
          </Card>

        </Col>
      </Row>
    </Container>

  );
}
