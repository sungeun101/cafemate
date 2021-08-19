import axios from 'axios';
// import { baseURL } from './config';
const baseURL = 'http://localhost:4000';
const endpoint = '/comments';

const get = (cafe_id) => {
  return axios.get(baseURL + endpoint + '/' + cafe_id);
};

const add = (data) => {
  return axios.post(baseURL + endpoint, data);
};

const update = (id) => {
  return axios.patch(baseURL + endpoint + '/' + id);
};

const remove = (id) => {
  return axios.delete(baseURL + endpoint + '/' + id);
};

export const commentService = {
  get,
  add,
  update,
  remove,
};
