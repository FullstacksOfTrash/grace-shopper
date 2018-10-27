import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { productReducer, authReducer, reviewReducer, categoryReducer } from './reducers';

const reducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer,
  categories: categoryReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
