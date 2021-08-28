import axios from 'axios';
// import { baseUrl } from './config';
const baseUrl = 'http://localhost:4003';
const endpoint = '/users';

const getUserById = (user_id) => {
  return axios.get(`${endpoint}/${user_id}`);
  // return axios.get(`${baseUrl}${endpoint}?id=${user_id}`);
};

export const userService = {
  getUserById,
};
