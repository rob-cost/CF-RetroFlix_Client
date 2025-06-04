import { useEffect, useState } from "react";
import { MovieCard } from "../Movie-Card/movie-card";
import { MovieView } from "../Movie-View/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../Signup-View/signup-view";
import { Button, Col, Row, Container } from "react-bootstrap";
import { BeatLoader} from "react-spinners";
import { SimilarMovies } from "../Similar-Movies/similar-movies";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [loading, setLoading] = useState(false);

  // Fetching list of movies from the API
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://my-vintage-flix-06cde8de3bcb.herokuapp.com/movies', {
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
        setTimeout(() => {
          setMovies(movieFromApi);
          setLoading(true);
        }, 1000)

      });

  }, [token])


  // Creating a list of movies with the same genre of a selected one 
  useEffect(() => {
    if (selectMovie) {
      const relatedMovies = movies.filter((m) => m.Genre.Name === selectMovie.Genre.Name && m.id !== selectMovie.id);
      setSimilarMovies(relatedMovies);
    } else {
      setSimilarMovies([]);
    };
  }, [selectMovie, movies]);




  // Login form
  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }} />
          or
          <SignupView />

        </>
      )

        // Renders selected Movie
        : selectMovie ? (
          <>
            <MovieView
              movie={selectMovie}
              onBackClick={() => {
                setSelectMovie(null);
              }}
            />
            <hr />
            <SimilarMovies
            movies={similarMovies}
            onMovieClick={(movie) => setSelectMovie(movie)}
           
            
            />
            {/* <h2>Similar Movies</h2>
            <ul>
              {similarMovies.map((movie) => (
                <li key={movie.id}
                  onClick={() => {
                    setSelectMovie(movie)
                  }}
                >
                  {movie.Title}
                </li>))}
            </ul> */}
          </>
        )

          : loading === false ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
            <BeatLoader />
            </Container>
          )

            // Renders list of movies in case is not empty
            : movies.length === 0 ? (
              <div>Movies list is empty</div>
            ) : (
              <>
                  {movies.map((movie) => (
                    <Col className="mb-3" md={3}>
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onMovieClick={(newSelectMovie) => {
                        setSelectMovie(newSelectMovie);
                      }}
                    />
                    </Col>
                  ))}
                  <Row className="justify-content-left">
                    <Col md={2}>
                  <Button
                    className="btn btn-danger"
                    onClick={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}>
                    Logout
                  </Button>
                  </Col>
                  </Row>
              </>
            )
      }
    </Row>
  );
}

