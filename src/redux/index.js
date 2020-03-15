import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const storeEnhancers = process.env.NODE_ENV === 'production' ? compose(thunk) : compose(composeWithDevTools(applyMiddleware(thunk, logger)));

const configureStore = (initState = {}) => {
  const store = createStore(rootReducer, initState, storeEnhancers);

  // if (module.hot && process.env.NODE_ENV !== 'production') {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./rootReducer', () => {
  //     console.info('replacing reducer...')
  //     const nextRootReducer = require('./rootReducer').default;
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }
  return store;
};

export default configureStore();
