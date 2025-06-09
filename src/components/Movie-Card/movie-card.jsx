import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie, token, favoriteChange }) => {

  const [isFavorite, setIsFavorite] = useState(false)
  const [toWatch, setToWatch] = useState(false)

  const id = movie.id
  const username = JSON.parse(localStorage.getItem('user')).Username;
  const favMovies = JSON.parse(localStorage.getItem('user')).FavoriteMovies;
  const toWatchMovies = JSON.parse(localStorage.getItem('user')).ToWatch;


  useEffect(() => {
    setIsFavorite(favMovies.includes(id))
    setToWatch(toWatchMovies.includes(id))
  }, [favMovies, id, toWatchMovies])


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
          }).catch((err) => {
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
        console.log('Movie' + id + ' removed from favorites')

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
          }).catch((err) => {
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

  /* ---- ADD MOVIE TO TO WATCH LIST ---- */
  const addToWatch = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8080/users/${username}/towatch/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + id + ' added to to watch list')

        // Fetch API to update the local storage
        fetch(`http://localhost:8080/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setToWatch(true)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch((err) => {
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


  /* ---- REMOVE MOVIE FROM TO WATCH LIST ---- */
  const removeFromToWatch = (event) => {
    event.preventDefault();

    fetch(`http://localhost:8080/users/${username}/towatch/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }
    ).then((response) => {
      if (response.ok) {
        console.log('Movie' + id + ' removed from to watch list')

        // Fetch API and update local storage
        fetch(`http://localhost:8080/users/${username}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => response.json())
          .then((newData) => {
            localStorage.setItem('user', JSON.stringify(newData));
            setToWatch(false)
            if (favoriteChange) {
              favoriteChange()
            }
          }).catch((err) => {
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
      <Card className="h-100 movie-card">
        <Card.Img
          className="movie-image"
          variant="top"
          src={movie.Image}
          /* className="img-fluid" */
          />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre?.Name}</Card.Text>
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