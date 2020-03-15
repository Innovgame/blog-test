import {
  APP_NAME
} from './constants';
export default function (name) {
  return {
    type: APP_NAME,
    data: name
  };
}
