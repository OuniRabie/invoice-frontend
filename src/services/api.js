import axios from "axios";

const api = axios.create({
  baseURL: "/api", // This works with proxy for development
  // Or use full URL when not using proxy
  // baseURL: 'http://localhost:5000/api',
});

export default api;
