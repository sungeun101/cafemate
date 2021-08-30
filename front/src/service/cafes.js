import axios from 'axios';
// import { baseUrl } from './config';
const baseUrl = 'http://localhost:4002';
const endpoint = '/cafes';

const getCafeById = (cafe_id) => {
  return axios.get(endpoint + '/' + cafe_id);
};

export const cafeService = {
  getCafeById,
};
