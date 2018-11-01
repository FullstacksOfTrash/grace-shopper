
import { GET_ORDERS, UPDATE_ORDER, REMOVE_ORDERS } from './actionTypes';
import { GET_PRODUCTS, GET_CATEGORIES, CREATE_PRODUCT, DELETE_PRODUCT } from './actionTypes';
import { CREATE_REVIEW, DELETE_REVIEW, GET_PRODUCT_REVIEWS, EDIT_REVIEW } from './actionTypes';
import { SET_AUTH, LOGOUT } from './actionTypes';

export const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products.sort(function (a, b) {
        return a.name - b.name
      });
    case CREATE_PRODUCT:
      return Object.assign(state, action.product)
    case DELETE_PRODUCT:
      const filtered = state.filter(product => product.id !== action.product.id)
      return filtered
  }
  return state;
}

export const orderReducer = (state=[], action)=> {
  switch(action.type) {
    case GET_ORDERS:
      return action.orders;
    case REMOVE_ORDERS:
      return [];
    default:
      return state;
  }
}

export const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS:
      return action.reviews
    case CREATE_REVIEW:
      return [...state, action.review]
    case DELETE_REVIEW:
      return state.filter(review => review.id !== action.reviewId)
    case EDIT_REVIEW:
      return state.map(review => review.id !== action.update.id ? review : action.update )
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

export const countReducer = (state = 0, action) => {

  return state;
}
