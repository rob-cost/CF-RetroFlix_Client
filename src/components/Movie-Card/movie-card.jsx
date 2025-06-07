import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie, token, favoriteChange }) => {

  const [isFavorite, setIsFavorite] = useState(false)

  const id = movie.id
  const username = JSON.parse(localStorage.getItem('user')).Username;
  const favMovies = JSON.parse(localStorage.getItem('user')).FavoriteMovies;

  useEffect(() => {
    setIsFavorite(favMovies.includes(id))
  }, [favMovies, id])


/* ---- ADD MOVIE TO FAVORITE ---- */
  const addToFavorites = (event) => {
    event.preventDefault();

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

        // Fetch API to update the local storage
        fetch(`http://localhost:8080/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setIsFavorite(true)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch ((err) => {
            console.log('Not able to fetch new data from API' + err)
          })
      }
      else {
        console.log('Movie not added')
      }
    }).catch((err) => {
      console.log('Not able to add movie' + err)
    })
  }



/* ---- REMOVE MOVIE FROM FAVORITE ---- */
  const removeFromFavorites = (event) => {
    event.preventDefault();

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

        // Fetch API and update local storage
        fetch(`http://localhost:8080/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setIsFavorite(false)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch ((err) => {
            console.log('Not able to fetch new data from API' + err)
          })
      } else {
        console.log('Movie not removed')
      }
    })
      .catch((err) => {
        console.log('Not able to remove movie' + err)
      })
  }

  /* ---- RETURN A MOVIE CARD ---- */
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
          <Card.Text>{movie.Genre?.Name}</Card.Text>
          {!isFavorite ? (
            <Button onClick={addToFavorites}>
              <i className="bi bi-heart"></i>
            </Button>
          ) : (
            <Button onClick={removeFromFavorites}>
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