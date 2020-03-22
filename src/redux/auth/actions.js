import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './constants';
import axios from '@/lib/axios';

export const login = ({
  username,
  password
}) => {
  return (dispatch) => {
    axios.post('/examples/login', {
        username,
        password
      })
      .then(res => {
        if (res.code !== 200) {
          return new Error('用户名或密码错误');
        }
        localStorage.setItem('token', res.data.token);
        dispatch({
          type: LOGIN,
          payload: res
        });
      }).catch(err => {
        console.error(err);
      });
  };
};

export const register = ({
  username,
  password
}) => {
  return (dispatch) => {
    axios.post('/examples/register', {
        username,
        password
      })
      .then((res) => {
        if (res.code !== 0) {
          console.log(res);
          return new Error('用户已注册');
        } else {
          dispatch({
            type: REGISTER
          });
          return axios.post('examples/login', {
            username,
            password
          });
        }
      })
      .then(res => {
        if (res.code !== 0) {
          return Error('用户名或密码错误');
        }
        dispatch({
          type: LOGIN,
          payload: res
        });
      })
      .catch(err => console.error(err));
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};
