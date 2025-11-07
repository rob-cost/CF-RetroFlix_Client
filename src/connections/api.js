const BASE_URL = "https://my-vintage-flix-06cde8de3bcb.herokuapp.com";

const handleResponse = async response => {
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    const text = await response.text();
    throw new Error(text || "API Error");
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const loginUser = async data => {
  const fetchCall = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return handleResponse(fetchCall);
};

const signupUser = async data => {
  const fetchCall = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(fetchCall);
};

const getMovies = async token => {
  const fetchCall = await fetch(`${BASE_URL}/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(fetchCall);
};

const getFavMovies = async (movie, token) => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(
    `${BASE_URL}/users/${username}/favorites/${movie.id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return handleResponse(fetchCall);
};

const deleteFavMovies = async (movie, token) => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(
    `${BASE_URL}/users/${username}/favorites/${movie.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return handleResponse(fetchCall);
};

const getToWatchMovies = async (movie, token) => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(
    `${BASE_URL}/users/${username}/towatch/${movie.id}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return handleResponse(fetchCall);
};

const deleteToWatchMovies = async (movie, token) => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(
    `${BASE_URL}/users/${username}/towatch/${movie.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return handleResponse(fetchCall);
};

const getUser = async token => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(`${BASE_URL}/users/${username}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(fetchCall);
};

const updateUser = async (token, data) => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(`${BASE_URL}/users/${username}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(fetchCall);
};

const deleteUser = async token => {
  const username = JSON.parse(localStorage.getItem("user")).Username;
  const fetchCall = await fetch(`${BASE_URL}/users/${username}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(fetchCall);
};

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
  signupUser,
};
