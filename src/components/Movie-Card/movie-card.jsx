import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
     <Card className="h-100" onClick={() => onMovieClick(movie)}>
      <Card.Img 
      variant="top" 
      src={movie.Image} 
      className="img-fluid" 
      style={{ maxHeight: '400px', maxWidth: '400px', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
      </Card.Body>
     </Card>
    )};



// Prop types define
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
  onMovieClick: PropTypes.func.isRequired
}