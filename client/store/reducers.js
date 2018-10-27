
import { GET_ORDERS } from './actionTypes';
import { GET_PRODUCTS, GET_CATEGORIES } from './actionTypes';
import { GET_ALL_REVIEWS, CREATE_REVIEW } from './actionTypes';
import { SET_AUTH, LOGOUT } from './actionTypes';

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products.sort(function (a, b) {
        return a.name - b.name
      });
  }
  return state;
}

export const orderReducer = (state=[], action)=> {
  switch(action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}

export const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return [...state, action.review]
    case GET_ALL_REVIEWS:
      return action.reviews
  }
  return state;
}

export const authReducer = (state = { user: {} }, action) => {
  switch(action.type){
    case SET_AUTH:
      return { user: action.user }
    case LOGOUT:
      return { user: {}}
    default:
      return state
  }
}

export const categoryReducer = (state = [], action) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
