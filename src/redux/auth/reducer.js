import {
  LOGIN,
  LOGOUT
} from './constants';

const defaultAuth = {
  isLogin: false
}

const auth = (auth = defaultAuth, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...auth, isLogin: true
      };
    case LOGOUT:
      return {
        ...auth, isLogin: false
      };
    default:
      return auth;
  }
};

export default auth;
