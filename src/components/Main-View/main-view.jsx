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
import { NotFound404 } from "../Routes/404NotFound";
import { getMovies } from "../../connections/api";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  

  // Fetching list of movies from the API
  useEffect(() => {
    setLoading(true)
    const fetchData = async() => {
      try{
      const result = await getMovies(token)
      const moviesFromApi = result.map((movie)=> {
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
        }
      })
      setMovies(moviesFromApi)
      console.log('Movies fetched correctly')
      setLoading(false)
      }
      catch(err){
        console.alert('Error ' + err)
      }
    }
    fetchData()
  }, [token])

  // console.log(movies)


  // Search function
  const filteredMovies = searchItem
    ? movies.filter((m) => m.Title.toLowerCase().includes(searchItem.toLowerCase()))
    : movies;


  // Login form
  return (
    <BrowserRouter>

      <Container>
        <Routes>
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />)
                  :
                  <Container className="d-flex justify-content-center align-items-center vh-100"
                  style={{ transform: 'translateY(-10%)' }}>
                  <ModalLogin
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }} />
                    </Container>
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
                  <Container className="d-flex justify-content-center align-items-center vh-100"
                  style={{ transform: 'translateY(-10%)' }}>
                  <ModalSignup />
                  </Container>
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
                ) : loading ?
                  <Container className="d-flex justify-content-center align-items-center vh-100">
                    <BeatLoader />
                  </Container> :
                  movies.length === 0 ? (
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                      <div>Movies list is empty</div>
                    </Container>
                  ) : (
                    <>
                      <NavScroll
                        setUser={setUser}
                        setToken={setToken}
                        searchItem={searchItem}
                        setSearchItem={setSearchItem}
                      />
                      <Row className="mt-5 mb-5 g-3">
                        {filteredMovies.map((movie) => (
                          <Col className="mb-4 d-flex d-sm-block justify-content-center" xs={12} sm={6} md={4} lg={3} key={movie.id}>
                            <MovieCard
                              movie={movie}
                              token={token}
                            />
                          </Col>
                        ))}
                      </Row>
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
                ) : loading ?
                  <Container className="d-flex justify-content-center align-items-center vh-100">
                    <BeatLoader />
                  </Container> :
                  movies.length === 0 ? (
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                      <div>Movies list is empty</div>
                    </Container>
                  ) : (
                  <>
                    <NavScroll
                      setUser={setUser}
                      setToken={setToken}
                      searchItem={searchItem}
                      setSearchItem={setSearchItem}
                    />
                    <MovieView 
                    movies={movies}
                    token={token}
                    />

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
                  <Navigate to='/login' replace />
                ) : (
                  <>
                    <NavScroll
                      setUser={setUser}
                      setToken={setToken}
                      searchItem={searchItem}
                      setSearchItem={setSearchItem}
                    />
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

          <Route
            path="/*"
            element={<NotFound404 />}
          />

        </Routes>

      </Container>
    </BrowserRouter >
  );
}

