import { useState, useEffect } from "react";
import { deleteFavMovies, deleteToWatchMovies, getFavMovies, getToWatchMovies, getUser } from "../../connections/api";

export const UseMovieAction = ({ movie, token, favoriteChange }) => {

  const [isFavorite, setIsFavorite] = useState(false)
  const [toWatch, setToWatch] = useState(false)
  const favMovies = JSON.parse(localStorage.getItem('user')).FavoriteMovies;
  const toWatchMovies = JSON.parse(localStorage.getItem('user')).ToWatch;



  useEffect(() => {
    setIsFavorite(favMovies.includes(movie.id))
    setToWatch(toWatchMovies.includes(movie.id))
  }, [favMovies, movie, toWatchMovies])


  /* ---- ADD MOVIE TO FAVORITE ---- */

  const addToFavorites = async (event) => {
    event.preventDefault();

    try {
      const favoriteMovies = await getFavMovies(movie, token);

      if (favoriteMovies) {
        console.log('Movie' + movie.id + ' added to favorites')
        const newData = await getUser(token)
        localStorage.setItem('user', JSON.stringify(newData));
        setIsFavorite(true)
        if (favoriteChange) {
          favoriteChange()
        }
      }
      else {
        console.log('Movie not added')
      }
    }
    catch (err) {
      console.alert('Error ' + err)
    }
  }


  /* ---- REMOVE MOVIE FROM FAVORITE ---- */

  const removeFromFavorites = async (event) => {
    event.preventDefault();

    try {
      const favoriteMovies = await deleteFavMovies(movie, token);

      if (favoriteMovies) {
        console.log('Movie' + movie.id + ' removed from favorites')
        const newData = await getUser(token)
        localStorage.setItem('user', JSON.stringify(newData));
        setIsFavorite(false)
        if (favoriteChange) {
          favoriteChange()
        }
      }
      else {
        console.log('Movie not removed')
      }
    }
    catch (err) {
      console.alert('Error ' + err)
    }
  }

  /* ---- ADD MOVIE TO TO WATCH LIST ---- */

    const addToWatch = async (event) => {
    event.preventDefault();

    try {
      const towatchMovies = await getToWatchMovies(movie, token)

      if (towatchMovies) {
        console.log('Movie' + movie.id + ' added to to watch list')
        const newData = await getUser(token)
        localStorage.setItem('user', JSON.stringify(newData));
        setToWatch(true)
        if (favoriteChange) {
          favoriteChange()
        }
      }
      else {
        console.log('Movie not added')
      }
    }
    catch (err) {
      console.alert('Error ' + err)
    }
  }


  /* ---- REMOVE MOVIE FROM TO WATCH LIST ---- */

    const removeFromToWatch = async (event) => {
    event.preventDefault();

    try {
      const towatchMovies = await deleteToWatchMovies(movie, token)

      if (towatchMovies) {
        console.log('Movie' + movie.id + ' removed from to watch list')
        const newData = await getUser(token)
        localStorage.setItem('user', JSON.stringify(newData));
        setToWatch(false)
        if (favoriteChange) {
          favoriteChange()
        }
      }
      else {
        console.log('Movie not removed')
      }
    }
    catch (err) {
      console.alert('Error ' + err)
    }
  }
  return {
    isFavorite,
    toWatch,
    addToFavorites,
    removeFromFavorites,
    addToWatch,
    removeFromToWatch
  }
};
