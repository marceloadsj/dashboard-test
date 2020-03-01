import axios from "axios";

const fetch = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

fetch.interceptors.request.use(config => {
  if (config?.meta?.token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${config.meta?.token}`
      }
    };
  }

  return config;
}, Promise.reject);

export default fetch;
