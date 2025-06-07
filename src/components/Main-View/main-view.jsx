import { useEffect, useState } from "react";
import { MovieCard } from "../Movie-Card/movie-card";
import { MovieView } from "../Movie-View/movie-view";
import { ModalLogin } from "../Login-View/login-view";
import { ModalSignup } from "../Signup-View/signup-view";
import { SimilarMovies } from "../Similar-Movies/similar-movies";
import { ProfileView } from "../Profile-View/profile-view";
import { Col, Row, Container } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import { NavScroll } from "../Navigation-Bar/navigation-bar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [loading, setLoading] = useState(false);

  // Fetching list of movies from the API
  useEffect(() => {
    // if (!token) {
    //   return;
    // }
    setLoading(true);
    fetch('http://localhost:8080/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Movies from API ' + data);
        const movieFromApi = data.map((movie) => {
          return {
            id: movie.id,
            Title: movie.Title,
            Genre: movie.Genre,
            Description: movie.Description,
            Director: movie.Director,
            Actors: movie.Actors,
            Release: movie.Release,
            Rating: movie.Rating,
            Image: movie.ImagePath
          };
        });
        setMovies(movieFromApi);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [token])


  // Login form
  return (
    <BrowserRouter>
      <NavScroll
        setUser={setUser}
        setToken={setToken}
      />
      <Container>
        <Row className="justify-content-md-center mt-5 mb-5">
          <Routes>
            <Route
              path='/login'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />)
                    :
                    <ModalLogin
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }} />
                  }
                </>
              }
            />
            <Route
              path='/signup'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <ModalSignup />
                  )
                  }
                </>
              }
            />

            <Route
              path='/'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : loading ? (
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                      <BeatLoader />
                    </Container>
                  ) : (<Navigate to='/movies' replace />)
                  }
                </>
              }
            />
            <Route
              path='/movies'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                      <div>Movies list is empty</div>
                    </Container>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-3" md={3} key={movie.id}>
                          <MovieCard 
                          movie={movie}
                          token={token}
                           />
                        </Col>
                      ))}
                    </>
                  )
                  }
                </>
              }
            />

            <Route
              path='movies/:title'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : (
                    <>
                      <MovieView movies={movies} />
                      <hr />
                      <SimilarMovies 
                      movies={movies} 
                      token={token}
                      />
                    </>
                  )}
                </>
              }
            />
            <Route
            path='/profile'
            element={
              <>
              {!user ? (
                <Navigate to='/login' replace/>
              ) : (
                <>
                <ProfileView 
                token={token}
                user={storedUser}
                movies={movies} />
                </>
              )
            }
              </>
            }
            />


          </Routes>
        </Row>
      </Container>
    </BrowserRouter >
  );
}

