import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export const ProfileView = ({ token }) => {

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }
    const username = JSON.parse(localStorage.getItem('user')).Username;

    fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
      .then((data) => {
        console.log(`User data: ${data}`);
        setUserData(data);
      })
      .catch((err) => console.error('Error fetching data' + err))
  }, [token])
  if (!userData) return <div>Loading data...</div>

  const handleSave = (event) => {
    event.preventDefault();
    const data = {
      Username: userData.Username,
      Password: userData.Password,
      Email: userData.Email,
      Birthday: new Date(userData.Birthday).toISOString(),
      City: userData.City,
    }
    const username = JSON.parse(localStorage.getItem('user')).Username;
    fetch(`https://my-vintage-flix-06cde8de3bcb.herokuapp.com/users/${username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

    }).then((response) => {
      if (response.ok) {
        alert('Profile updated')
        setIsEditing(false)
      }
      else {
        response.json().then((err)=>{
          console.error('Server' +err);
          alert('Updated failed:' +err.message)
        })
      }
    })
      .catch((error) => console.log('Error' + error))

  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Your Profile</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="form-username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.Username}
                    onChange={(e) => setUserData({ ...userData, Username: e.target.value })}
                    disabled={!isEditing} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form-password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.Password}
                    onChange={(e) => setUserData({ ...userData, Password: e.target.value })}
                    disabled={!isEditing} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form-email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.Email}
                    onChange={(e) => setUserData({ ...userData, Email: e.target.value })}
                    disabled={!isEditing} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form-birthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.Birthday?.slice(0, 10)}
                    onChange={(e) => setUserData({ ...userData, Birthday: e.target.value })}
                    disabled={!isEditing} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="form-city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.City}
                    onChange={(e) => setUserData({ ...userData, City: e.target.value })}
                    disabled={!isEditing} />
                </Form.Group>
              </Form>
              {!isEditing ? (
                <Button onClick={() => { setIsEditing(true) }}>Change</Button>
              ) : (
                <>
                  <Button variant='success' onClick={handleSave}>Save</Button>
                  <Button onClick={() => { setIsEditing(false) }}>Cancel</Button>
                </>
              )}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

