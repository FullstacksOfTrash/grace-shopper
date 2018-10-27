import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { productReducer, getProducts, authReducer, reviewReducer, createReview, getAllReviews } from './reducers'

// reviewReducer not currently connected or setup

// ******************* REDUCER / STORE *******************

const reducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

// ******************* helpers / selectors ******************* 

const getProduct = (id, products) => products.find(prd => prd.id === parseInt(id))

const getProductReviews = (id, reviews) => reviews.filter(rvw => rvw.productId === parseInt(id))

// ******************* EXPORTS *******************

export default store;

export {
  productReducer,
  getProducts,
  getProduct,
  createReview,
  getAllReviews,
  getProductReviews
}