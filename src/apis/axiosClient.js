import axios from "axios";
import queryString from "query-string";
// const tk = sessionStorage.getItem('momo-token')
// //console.log(tk);
const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_TEST,
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axios.defaults.withCredentials = true;
axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
