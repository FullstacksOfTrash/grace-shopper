import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import { productReducer, getProducts, authReducer, reviewReducer, createReview, getAllReviews } from './reducers'

const reducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
