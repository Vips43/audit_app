import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { Content_Type: "application/json" },
});

export default api;
