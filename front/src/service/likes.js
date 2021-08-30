import axios from 'axios';
// import { baseUrl } from './config';
const endpoint = '/likes';

const getLikedByUserId = (user_id) => {
  return axios.get(`${endpoint}/users/${user_id}`);
};

const addLike = (data) => {
  console.log('add like data :', data);
  return axios.post(`${endpoint}/${data.cafe_id}/${data.user_id}`);
};

const cancelLike = (data) => {
  return axios.delete(`${endpoint}/${data.cafe_id}/${data.user_id}`);
};

export const likesService = {
  getLikedByUserId,
  addLike,
  cancelLike,
};
