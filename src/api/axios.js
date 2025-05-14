import axios from "axios";

// Axios instance to interact with the JSON server
const api = axios.create({
  baseURL: "https://68243ff065ba05803399741b.mockapi.io", // Your local JSON Server URL
  timeout: 10000,
});

export default api;
