import axios from 'axios';
// import { baseUrl } from './config';
const endpoint = '/cafes';

const getCafeById = (cafe_id) => {
  return axios.get(endpoint + '/' + cafe_id + '/?page=0');
};

export const cafeService = {
  getCafeById,
};
