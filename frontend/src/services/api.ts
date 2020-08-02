import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:80',
});
// const api = axios;

export default api;
