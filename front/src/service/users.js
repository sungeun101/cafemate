import axios from 'axios';
// import { baseUrl } from './config';
const endpoint = '/users';

const getUserById = (user_id) => {
  return axios.get(`${endpoint}/${user_id}`);
};

export const userService = {
  getUserById,
};
