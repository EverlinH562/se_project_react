const baseUrl = "http://localhost:3001";

const request = (url, options) => {
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }).then(handleServerResponse);
};

const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

export { getItems, addItem, deleteItem, handleServerResponse };
