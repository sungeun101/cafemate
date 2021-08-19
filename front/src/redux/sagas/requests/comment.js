import axios from 'axios';

export function requestGetComment() {
  return axios.get('http://localhost:4000/comments');
}
