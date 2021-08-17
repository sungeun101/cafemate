import axios from 'axios';

export function requestGetComment() {
  return axios.get('https://my-json-server.typicode.com/sungeun101/demo/data');
}
