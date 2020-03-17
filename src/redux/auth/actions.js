import {
  LOGIN,
  LOGOUT
} from './constants';

export const login = () => {
  return {
    type: LOGIN
  }
};

export const logout = () => {
  return {
    type: LOGOUT
  }
};
