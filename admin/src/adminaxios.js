import axios from 'axios';

const adminAxios = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/admin', // Ensure the base URL is correct
  headers: {
    'Content-Type': 'application/json', // Default Content-Type, update if necessary
  },
  withCredentials: true,
});

export default adminAxios;
