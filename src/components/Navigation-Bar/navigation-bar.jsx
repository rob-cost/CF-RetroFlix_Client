import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const NavScroll = ({ setUser, setToken, searchItem, setSearchItem }) => {

const handleSearch = (e) => {
  e.preventDefault()
  const inputType = e.target.value
  setSearchItem(inputType)
}


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/movies"><h1>RetroFlix</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/movies">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              onChange={handleSearch}
              value={searchItem}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
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

