import {
  LOGIN,
  LOGOUT,
  REGISTER
} from './constants';

const defaultAuth = {
  isLogin: false
}

const auth = (auth = defaultAuth, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...auth, isLogin: true, user: action.payload.data
      };
    case LOGOUT:
      return {
        ...auth, isLogin: false
      };
    case REGISTER:
      return auth;
    default:
      return auth;
  }
};

export default auth;
