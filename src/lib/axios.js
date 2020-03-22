import axios from 'axios';
import NProgress from 'nprogress';
import {
  message
} from 'antd';

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.NODE_ENV === 'development' ? "http://localhost:5000" : ''
});

//拦截请求
instance.interceptors.request.use(
  config => {
    NProgress.start();
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = token;
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
    NProgress.done();
    return response.data;
  },
  error => {
    NProgress.done();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('您未被授权，请重新登录')
          break;
        case 500:
          message.error('服务器出问题了，请稍后再试');
          break;
        default:
          message.error('未知异常')
          break;
      }
      // localStorage.clear();
    }
    // message.error(error.response.statusText);
    return Promise.reject(error);
  }
);

export default instance;
