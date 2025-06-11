import { handleServerResponse } from './api';

const baseUrl = "http://localhost:3001"; 

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};