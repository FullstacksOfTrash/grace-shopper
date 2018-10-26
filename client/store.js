import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { productReducer, getProducts } from './reducers'

// ******************* REDUCER / STORE *******************

const reducer = combineReducers({
  products: productReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

// ******************* EXPORTS *******************

export default store;

export {
  productReducer,
  getProducts
}