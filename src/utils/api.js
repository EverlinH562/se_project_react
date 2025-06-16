const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) => {
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  return res.json();
};

const request = (url, options = {}) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }).then(handleServerResponse);
};

const getItems = () => {
 return fetch(`${baseUrl}/items`).then(handleServerResponse);
};

const addItem = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

const deleteItem = (itemId, token) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

const register = ({ email, password, name, avatar }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, name, avatar }), 
  });
};

const authorize = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

const updateUser = ({ name, avatar }, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};


const signup = (user) => {
  return fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then(err => Promise.reject(err));
    }
    return res.json();
  });
};



export {
  getItems,
  addItem,
  deleteItem,
  register,
  authorize,
  updateUser,
  addCardLike,
  removeCardLike,
  handleServerResponse,
  signup
};