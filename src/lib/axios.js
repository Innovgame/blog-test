import axios from 'axios';
import {
  message
} from 'antd';

const instance = axios.create({
  timeout: 20000,
  baseURL: "http://localhost:5000"
});

//拦截请求
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = "Token" + token;
    }
    return config;
  },
  error => {
    message.error('bad request');
    return Promise.reject(error);
  }
);

//拦截响应
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // message.error(error.response.statusText);
    return Promise.reject(error);
  }
);

export default instance;
