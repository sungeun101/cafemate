import axios from 'axios';
// import { baseUrl } from './config';
const baseUrl = 'http://localhost:4000';
const endpoint = '/comments';

const getCommentsByCafeId = (cafe_id) => {
  return axios.get(endpoint + '/' + cafe_id);
  // return axios.get(`${baseUrl}${endpoint}?cafe_id=${cafe_id}`);
};

const getCommentsByUserId = (user_id) => {
  return axios.get(endpoint + '/users/' + user_id);
  // return axios.get(`${baseUrl}${endpoint}?user_id=${user_id}`);
};

const addComment = (data) => {
  return axios.post(endpoint, data);
  // return axios.post(baseUrl + endpoint, data);
};

const updateComment = (comment_id, data) => {
  return axios.patch(endpoint + '/' + comment_id, data);
  // return axios.patch(baseUrl + endpoint + '/' + comment_id, data);
};

const removeComment = (comment_id) => {
  return axios.delete(endpoint + '/' + comment_id);
  // return axios.delete(baseUrl + endpoint + '/' + comment_id);
};

export const commentService = {
  getCommentsByCafeId,
  getCommentsByUserId,
  addComment,
  updateComment,
  removeComment,
};
