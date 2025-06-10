import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UseMovieAction } from "../Use-Movie-Action/useMovieAction";

export const MovieCard = ({ movie, token, favoriteChange }) => {

  const {
    isFavorite,
    toWatch,
    addToFavorites,
    removeFromFavorites,
    addToWatch,
    removeFromToWatch
  } = UseMovieAction ({movie, token, favoriteChange});

  let text = movie.Description
  if (text.length > 50) {
    text = text.substring(0,49) + "..."
  }

  /* ---- RETURN A MOVIE CARD ---- */
  return (
    <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
      <Card className="h-100 movie-card">
        <Card.Img
          className="movie-image img-fluid"
          variant="top"
          src={movie.Image}
          />
        <Card.Body className="card-body">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text
          className="genre-text"
          >{movie.Genre?.Name}</Card.Text>
          <Card.Text>"{text}"</Card.Text>
        </Card.Body>
        <div className="card-buttons-bottom">
          {!toWatch ? (
            <Button onClick={addToWatch}
              >
              + To Watch
            </Button>
          ) : (
            <Button
              onClick={removeFromToWatch}
              >
              - Remove
            </Button>
          )}
          {!isFavorite ? (
            <Button 
            onClick={addToFavorites}
            className="bi bi-heart ">
            </Button>
          ) : (
            <Button 
            onClick={removeFromFavorites}
            className="bi bi-heart-fill">
            </Button>
          )}

        </div>
      </Card>
    </Link> 
  )
};



// Prop types define
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
}