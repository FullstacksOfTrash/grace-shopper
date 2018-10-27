import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { productReducer, authReducer, reviewReducer, categoryReducer, ordersReducer } from './reducers';

const reducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer,
  categories: categoryReducer,
  orders: ordersReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
