import axios from 'axios';
// import { baseUrl } from './config';
// const endpoint = '/likes/users';
const baseUrl = 'http://localhost:4001';
const endpoint = '/likes';

const getLikedByUserId = (user_id) => {
  // return axios.get(`${baseUrl}${endpoint}/${user_id}`);
  return axios.get(`${baseUrl}${endpoint}?user_id=${user_id}`);
};

const addLike = (data) => {
  return axios.post(baseUrl + endpoint, data);
};

const cancelLike = (data) => {
  return axios.delete(`${baseUrl}${endpoint}/${data.user_id}/${data.cafe_id}`);
};

export const likesService = {
  getLikedByUserId,
  addLike,
  cancelLike,
};
