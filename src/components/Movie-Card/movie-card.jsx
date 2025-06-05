import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  return (
    <Link to ={`/movies/${encodeURIComponent(movie.Title)}`}>
     <Card className="h-100">
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
     </Link>
    )};



// Prop types define
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }),
}