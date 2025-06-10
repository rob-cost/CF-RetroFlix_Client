import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../Movie-Card/movie-card";


export const ProfileView = ({ token, movies }) => {

  const [originalUserData, setOriginalUserData] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [toWatchMovies, setToWatchMovies] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  /* --- OBTAIN USER INFOS --- */
  useEffect(() => {
    const username = JSON.parse(localStorage.getItem('user')).Username;

    fetch(`http://localhost:8080/users/${username}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => response.json())
      .then((data) => {
        data.Password = '';
        setUserData(data)
        setOriginalUserData(data);
        const favMovies = movies.filter((i) => data.FavoriteMovies.includes(i.id))
        const watchMovies = movies.filter((i) => data.ToWatch.includes(i.id))
        setFavoriteMovies(favMovies)
        setToWatchMovies(watchMovies)
      })
      .catch((err) => console.error('Error fetching data' + err))
  }, [token, movies])

  if (!userData) return <div>Loading data...</div>


  /* ---- SAVE BUTTON FUNCTION ---- */
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
    fetch(`http://localhost:8080/users/${username}`, {
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
        response.json().then((err) => {
          console.error('Server' + err);
          alert('Updated failed: ' + err.message)
        })
      }
    })
      .catch((err) => {
        alert('Error' + err)
        console.log('Error' + err)
      })

  };


  /* ---- CANCEL CHANGES BUTTON FUNCTION ---- */
  const handleCancel = (event) => {

    event.preventDefault();
    setUserData(originalUserData)
    setIsEditing(false);
  };



  /* ---- DELETE USER BUTTON FUNCTION ---- */
  const handleDelete = (event) => {
    event.preventDefault();
    const username = JSON.parse(localStorage.getItem('user')).Username;
    fetch(`http://localhost:8080/users/${username}`, {
      method: 'DELETE',
      headers: { "Authorization": `Bearer ${token}` }
    }

    ).then((response) => {
      if (response.ok) {
        alert('Profile deleted')
        localStorage.clear();
        window.location.href = '/signup'


      }
      else {
        response.json().then((err) => {
          alert('Error' + err)
          console.log(err)
        })
      }
    })
      .catch((err) => {
        console.log("Error" + err)
      })
  }

  /* ---- REFRESH PAGE AFTER CHANGE ---- */

  const refreshFavs = () => {
    const updatedUser = JSON.parse(localStorage.getItem('user'));
    const favMovies = movies.filter((i) => updatedUser.FavoriteMovies.includes(i.id))
    const watchMovies = movies.filter((i) => updatedUser.ToWatch.includes(i.id))
    setFavoriteMovies(favMovies)
    setToWatchMovies(watchMovies)
  }
  


  /* ---- RETURN USER INFOS ---- */
  return (
    <>
      <Container>
        <Row>
          <Col md={5}>
            <Card>
              <Card.Body>
                <Card.Title>Your Profile</Card.Title>
                <Form
                 onSubmit={handleSave}
                 className="profile-form">
                  <Form.Group className="mb-3" controlId="form-username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={userData.Username}
                      required
                      onChange={(e) => setUserData({ ...userData, Username: e.target.value })}
                      disabled={!isEditing} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="form-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={userData.Password}
                      required
                      onChange={(e) => setUserData({ ...userData, Password: e.target.value })}
                      disabled={!isEditing} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="form-email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={userData.Email}
                      required
                      onChange={(e) => setUserData({ ...userData, Email: e.target.value })}
                      disabled={!isEditing} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="form-birthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      value={userData.Birthday?.slice(0, 10)}
                      onChange={(e) => setUserData({ ...userData, Birthday: e.target.value })}
                      required
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

                  {!isEditing ? (
                    <>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button onClick={() => { setIsEditing(true) }}>Change</Button>
                      <Button onClick={handleDelete}>Delete</Button>
                      </div>
                    </>
                  ) : (
                    <>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <Button type="submit" variant='success'>Save</Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                      </div>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      <Container>
        <Row className="mt-5 mb-5">
          {favoriteMovies.length === 0 ? (
            <h3>No Favorite Movies in your list</h3>
          ) : (
            <>
              <h3>Favorite Movies</h3>
              {favoriteMovies.map((m) => {
                return (
                  <Col className="mb-3" md={3} key={m.id}>
                    <MovieCard
                      movie={m}
                      token={token}
                      favoriteChange={refreshFavs}
                    />
                  </Col>
                );
              })}
            </>
          )}
        </Row>
      </Container>

      <Container>
        <Row className="mt-5 mb-5">
          {toWatchMovies.length === 0 ? (
            <h3>Nothing to watch later</h3>
          ) : (
            <>
              <h3>To Watch List</h3>
              {toWatchMovies.map((movie) => {
                return (
                  <Col className="mb-3" md={3} key={movie.id}>
                    <MovieCard
                      movie={movie}
                      token={token}
                      favoriteChange={refreshFavs}
                    />
                  </Col>
                  
                );
              })}
            </>
          )}
        </Row>
      </Container>
    </>
  )
}

