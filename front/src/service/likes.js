import axios from 'axios';
// import { baseUrl } from './config';
const baseUrl = 'http://localhost:4001';
const endpoint = '/likes';

const getLikedByUserId = (user_id) => {
  return axios.get(`${endpoint}/users/${user_id}`);
};

const addLike = (data) => {
  return axios.post(`${endpoint}/${data.cafe_id}/users`, data);
};

const cancelLike = (data) => {
  return axios.delete(`${endpoint}/users/${data.user_id}/${data.cafe_id}`);
};

export const likesService = {
  getLikedByUserId,
  addLike,
  cancelLike,
};
