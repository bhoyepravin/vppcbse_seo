// src/utils/api.js
import axios from "axios";

// export const fileBaseURL = "http://127.0.0.1:8000/uploads";
// export const API_BASE_URL = "http://127.0.0.1:8000/api/";
export const fileBaseURL = "https://vppcms.demovoting.com/uploads";
export const API_BASE_URL = "https://vppcms.demovoting.com/api";
// export const fileBaseURL = "https://apivppcbse.bhonsala.in/uploads";
// export const API_BASE_URL = "https://apivppcbse.bhonsala.in/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // timeout: 10000,
});

export const api = {
  getNoticesAndEvents: async () => {
    const response = await axiosInstance.get("/notices-events");
    return response.data;
  },

  getHeroImages: async () => {
    const response = await axiosInstance.get("/hero-images");
    return response.data;
  },
};

export default axiosInstance;
