import {
  combineReducers
} from 'redux';

import countReducer from './counter-demo/reducer';
import appNameReducer from './app-name/reducer';

export default combineReducers({
  count: countReducer,
  appName: appNameReducer
});
