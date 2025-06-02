import { useEffect, useState } from "react";
import { MovieCard } from "../Movie-Card/movie-card";
import { MovieView } from "../Movie-View/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../Signup-View/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);

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
        setMovies(movieFromApi);
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
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  // Renders selected Movie
  if (selectMovie) {
    return (
      <>
        <MovieView
          movie={selectMovie}
          onBackClick={() => {
            setSelectMovie(null);
          }}
        />
        <hr />
        <h2>Similar Movies</h2>
        <ul>
          {similarMovies.map((movie) => (
            <li key={movie.id}
              onClick={() => {
                setSelectMovie(movie)
              }}
            >
              {movie.Title}
            </li>))}
        </ul>
      </>
    );
  }

  // Renders list of movies in case is not empty
  if (movies.length === 0) {
    return <div>Movies list is empty</div>;
  } else {
    return (
      <>
        <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={(newSelectMovie) => {
                setSelectMovie(newSelectMovie);
              }}
            />
          ))}
          <button onClick={()=> {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}>
            Logout
          </button>
        </div>
      </>
    );
  }
};

