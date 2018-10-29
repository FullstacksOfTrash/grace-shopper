import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import { productReducer, authReducer, reviewReducer, categoryReducer, orderReducer } from './reducers';
import { productReducer, authReducer, categoryReducer, orderReducer, reviewReducer } from './reducers';


const reducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  reviews: reviewReducer,
  categories: categoryReducer,
  orders: orderReducer
});

const store = createStore(reducer, applyMiddleware( thunk, logger ));

export default store;
