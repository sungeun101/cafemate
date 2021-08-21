import axios from 'axios';
// import { baseURL } from './config';
const baseURL = 'http://localhost:4000';
const endpoint = '/comments';

const getByCafeId = (cafe_id) => {
  console.log('CafeId : ', cafe_id);
  // return axios.get(baseURL + endpoint + '/' + cafe_id);
  return axios.get(`${baseURL}${endpoint}?cafe_id=${cafe_id}`);
};

const getByUserId = (user_id) => {
  // return axios.get(baseURL + endpoint + '/users/' + user_id);
  return axios.get(`${baseURL}${endpoint}?user_id=${user_id}`);
};

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

const update = (comment_id, data) => {
  return axios.patch(baseURL + endpoint + '/' + comment_id, data);
};

const remove = (comment_id) => {
  return axios.delete(baseURL + endpoint + '/' + comment_id);
};

export const commentService = {
  getByCafeId,
  getByUserId,
  add,
  update,
  remove,
};
