import {
  combineReducers
} from 'redux';

import countReducer from './counter-demo/reducer';
import appNameReducer from './app-name/reducer';
import authReducer from './auth/reducer';

export default combineReducers({
  count: countReducer,
  appName: appNameReducer,
  auth: authReducer
});
