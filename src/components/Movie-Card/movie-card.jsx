import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, token }) => {

    
    const favoriteMovies = JSON.parse(localStorage.getItem('user')).FavoriteMovies;
    const isFavorite = favoriteMovies.includes(movie.id)
    console.log(favoriteMovies)
    console.log(isFavorite)


    const addToFavorites = (event) => {
    event.preventDefault();
    const id = movie.id
    console.log(id)


    const username = JSON.parse(localStorage.getItem('user')).Username;
    fetch(`http://localhost:8080/users/${username}/favorites/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + id + ' added to favorites')
      }
      else {
        console.log('Movie not added')
      }
    }).catch((err)=> {
      console.log('Error' + err)
    })
  }
  const removeFromFavorites = (event) => {
    event.preventDefault();
    const id = movie.id
    console.log(id)

    const username = JSON.parse(localStorage.getItem('user')).Username;

    fetch(`http://localhost:8080/users/${username}/favorites/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + id + ' removed to favorites')
      }
      else {
        console.log('Movie removed')
      }
    }).catch((err)=> {
      console.log('Error' + err)
    })
  }

  return (
    <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={movie.Image}
          className="img-fluid"
          style={{ maxHeight: '400px', maxWidth: '400px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          { isFavorite ? (
            <Button onClick={removeFromFavorites}>
            <i className="bi bi-heart"></i>
          </Button>
          ): (
            <Button onClick={addToFavorites}>
            <i className="bi bi-heart-fill"></i>
          </Button>
          )}
          
        </Card.Body>
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