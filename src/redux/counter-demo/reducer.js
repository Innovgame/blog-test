import {
  INCREMENT_COUNT,
  DECREMENT_COUNT
} from './constants';

function counterReducer(count = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNT:
      return count + 1;
    case DECREMENT_COUNT:
      return count - 1;
    default:
      return count;
  }
}

export default counterReducer;
