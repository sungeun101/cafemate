import axios from 'axios';
// import { baseUrl } from './config';
const baseUrl = 'http://localhost:4002';
const endpoint = '/cafes';

const getCafesById = (cafe_id) => {
  return axios.get(baseUrl + endpoint + '/' + cafe_id);
};

export const cafeService = {
  getCafesById,
};
