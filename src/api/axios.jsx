import axios from 'axios';

const API = axios.create({
  baseURL: "https://jobboard-backend-1-9i5o.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;