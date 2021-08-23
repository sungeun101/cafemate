import axios from 'axios';
// import { baseUrl } from './config';
// const endpoint = '/likes/users';
const baseUrl = 'http://localhost:4001';
const endpoint = '/likes';

const getLikedCafesByUserId = (user_id) => {
  // return axios.get(`${baseUrl}${endpoint}/${user_id}`);
  return axios.get(`${baseUrl}${endpoint}?user_id=${user_id}`);
};

const likeCafe = (data) => {
  return axios.post(baseUrl + endpoint, data);
};

const cancelLikeCafe = (data) => {
  // return axios.delete(`${baseUrl}${endpoint}/${data.user_id}/${data.cafe_id}`);
  return axios.delete(
    `${baseUrl}${endpoint}?user_id=${data.user_id}/${data.cafe_id}`
  );
};

export const likesService = {
  getLikedCafesByUserId,
  likeCafe,
  cancelLikeCafe,
};
