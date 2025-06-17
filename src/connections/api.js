const BASE_URL = "https://my-vintage-flix-06cde8de3bcb.herokuapp.com";
const username = JSON.parse(localStorage.getItem('user')).Username;

const getMovies = async(token) => {
  const response = await fetch(`${BASE_URL}/movies`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  const movies = await response.json();
  return movies 
}

const getFavMovies = async(movie, token) => {
  const fetchData = await fetch(`${BASE_URL}/users/${username}/favorites/${movie.id}`, {
    method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
  })
  const favMovies = await fetchData.json();
  return favMovies

}


const deleteFavMovies = async(movie, token) => {
  const fetchData = await fetch(`${BASE_URL}/users/${username}/favorites/${movie.id}`, {
    method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
  })
  const favMovies = await fetchData.json();
  return favMovies

}

const getToWatchMovies = async(movie, token) => {
  const fetchData = await fetch(`${BASE_URL}/users/${username}/towatch/${movie.id}`, {
    method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
  })
  const toWatchMovies = await fetchData.json();
  return toWatchMovies

}

const deleteToWatchMovies = async(movie, token) => {
  const fetchData = await fetch(`${BASE_URL}/users/${username}/towatch/${movie.id}`, {
    method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
  })
  const toWatchMovies = await fetchData.json();
  return toWatchMovies

}

const getUser = async(token) => {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    method:'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  const userData = await response.json();
  return userData
}

const updateUser = async(token, data) => {
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
    const response = await fetch(`${BASE_URL}/users/${username}`, {
    method:'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  return response
  
}

const loginUser = async(data) => {
    const fetchCall = await fetch(`${BASE_URL}/login`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const response = await fetchCall.json();
    return response
}





export {
  getMovies,
  getFavMovies,
  deleteFavMovies,
  getToWatchMovies,
  deleteToWatchMovies,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
}

