import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { productReducer, getProducts } from './reducers'

// ******************* REDUCER / STORE *******************

const reducer = combineReducers({
  products: productReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

// ******************* helpers / selectors ******************* 

const getProduct = (id, products) => products.find(prd => prd.id === parseInt(id))

// ******************* EXPORTS *******************

export default store;

export {
  productReducer,
  getProducts,
  getProduct
}