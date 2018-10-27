import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { productReducer, getProducts, authReducer } from './reducers'

// ******************* REDUCER / STORE *******************

const reducer = combineReducers({
  products: productReducer,
  auth: authReducer
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

// ******************* EXPORTS *******************

export default store;

export {
  productReducer,
  getProducts
}