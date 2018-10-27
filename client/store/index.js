import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { productReduce, authReducer, reviewReducer } from './reducers';

const reducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
