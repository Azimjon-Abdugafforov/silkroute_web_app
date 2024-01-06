import axios from 'axios';
import router from '@/router';

// axios.defaults.baseURL = 'http://127.0.0.1:5279/api/v1';
axios.defaults.baseURL = 'https://bisp-api.azurewebsites.net/api/v1'
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;
axios.defaults.timeout = 300000;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 502) {
      // toast.error("Серверда хатолик!");
    }
    if (error.response.status === 401) {
      // toast.error("Фойдаланувчи қайд этилмади қайтадан киринг!");
      router.push("/page/login");
    }
    return error;
  },
);

export default axios;

