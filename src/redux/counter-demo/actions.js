import {
  INCREMENT_COUNT,
  DECREMENT_COUNT
} from './constants';

export const incrementCount = () => {
  return {
    type: INCREMENT_COUNT
  }
}
export const decrementCount = () => {
  return {
    type: DECREMENT_COUNT
  }
}
