const BASE_URL = "https://my-vintage-flix-06cde8de3bcb.herokuapp.com";

const getMovies = (setLoading, token, setMovies) => {

  setLoading(true);
  fetch(`${BASE_URL}/movies`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((response) => response.json())
    .then((data) => {
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
    })
    .finally(() => {
      setLoading(false);
    });
};


const getUser = async(token) => {
  const username = JSON.parse(localStorage.getItem('user')).Username;
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    method:'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  const userData = await response.json();
  return userData
}

const updateUser = async(token, data) => {
const username = JSON.parse(localStorage.getItem('user')).Username;
  const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    return response

  }


const deleteUser = async(token)=> {
    const username = JSON.parse(localStorage.getItem('user')).Username;
    const response = await fetch(`${BASE_URL}/users/${username}`, {
    method:'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
  
}





export {
  getMovies,
  getUser,
  updateUser,
  deleteUser
}

