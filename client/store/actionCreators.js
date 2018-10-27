

import { GET_ORDERS, UPDATE_ORDER } from './actionTypes';
import { GET_PRODUCTS, GET_CATEGORIES } from './actionTypes';
import { GET_ALL_REVIEWS, CREATE_REVIEW } from './actionTypes';
import { SET_AUTH, LOGOUT } from './actionTypes';


// Products
export const _getProducts = (products) => ({ type: GET_PRODUCTS, products });

// Orders
export const _getOrders = (orders)=> ({ type: GET_ORDERS, orders });
export const _updateOrder = (order)=> ({ type: UPDATE_ORDER, order });

// Reviews
export const _getAllReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews})
export const _createReview = (review) => ({ type: CREATE_REVIEW, review})

// Auth
export const _setAuth = user => ({ type: SET_AUTH, user})
export const _logOut = () => ({ type: LOGOUT })

// Categories
export const _getCategories = (categories) => ({ type: GET_CATEGORIES, categories })

