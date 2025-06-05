
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';



export const NavScroll = ({ setUser, setToken }) => {

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/movies">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/towatch">To-Watch</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
            />
            </Form>
            <Nav.Link onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}>Logout</Nav.Link>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

