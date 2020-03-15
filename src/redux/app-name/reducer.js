import {
  APP_NAME
} from './constants';

export default function (appName = "Blog", action) {
  if (action.type === APP_NAME) {
    return action.data;
  } else {
    return appName;
  }
}
