import { useEffect, useState } from "react";
import { MovieCard } from "../Movie-Card/movie-card";
import { MovieView } from "../Movie-View/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);
  useEffect(()=>{
     fetch('https://my-vintage-flix-06cde8de3bcb.herokuapp.com/movies')
    .then((response) => response.json())
    .then((movie)=>{
      const movieFromApi = movie.map((movie)=>{
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
  }, [])


  if (selectMovie) {
    return (
      <MovieView
        movie={selectMovie}
        onBackClick={() => {
          setSelectMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>!Movies list is empty</div>;
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
        </div>
      </>
    );
  }
};

