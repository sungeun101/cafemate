import axios from 'axios';
// import { baseUrl } from './config';
const endpoint = '/comments';

const getCommentsByCafeId = (cafe_id) => {
  return axios.get(`${endpoint}/${cafe_id}/? page=0`);
};

const getCommentsByUserId = (user_id) => {
  return axios.get(endpoint + '/users/' + user_id + '/?page=0');
};

const addComment = (data) => {
  console.log('add comment data : ', data);
  return axios.post(endpoint, data);
};

const updateComment = (comment_id, data) => {
  return axios.patch(endpoint + '/' + comment_id, data);
};

const removeComment = (comment_id) => {
  return axios.delete(endpoint + '/' + comment_id);
};

export const commentService = {
  getCommentsByCafeId,
  getCommentsByUserId,
  addComment,
  updateComment,
  removeComment,
};
