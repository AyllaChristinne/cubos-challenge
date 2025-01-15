import axios from "axios";
import { API_BASE_URL } from "@/constants/endpoints";
import { useStateContext } from "../context/StateContext";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const apiToken = process.env.REACT_APP_TMDB_API_TOKEN;
    if (apiToken) {
      config.headers.Authorization = `Bearer ${apiToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
