const baseUrl = "http://localhost:3001";

 const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
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

const register = ({ email, password, name }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
};

const authorize = ({ email, password }) => {
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
};