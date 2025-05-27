// lib/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // adjust if needed
  withCredentials: true, // needed if you're handling cookies/JWTs
});

export default api;
