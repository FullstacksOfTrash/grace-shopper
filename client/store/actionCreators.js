

import { GET_ORDERS, UPDATE_ORDER, REMOVE_ORDERS } from './actionTypes';
import { GET_PRODUCTS, GET_CATEGORIES } from './actionTypes';
import { CREATE_REVIEW, DELETE_REVIEW, GET_PRODUCT_REVIEWS } from './actionTypes';
import { SET_AUTH, LOGOUT } from './actionTypes';


// Products
export const _getProducts = (products) => ({ type: GET_PRODUCTS, products });

// Orders
export const _getOrders = (orders)=> ({ type: GET_ORDERS, orders });
export const _updateOrder = (order)=> ({ type: UPDATE_ORDER, order });
export const _removeOrders = () => ({ type: REMOVE_ORDERS })

// Reviews
// export const _getAllReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews})
export const _createReview = (review) => ({ type: CREATE_REVIEW, review})
export const _deleteReview = (review) => ({ type: DELETE_REVIEW, review})
export const _getProductReviews = (reviews) => ({type: GET_PRODUCT_REVIEWS, reviews})

// Auth
export const _setAuth = user => ({ type: SET_AUTH, user})
export const _logOut = () => ({ type: LOGOUT })

// Categories
export const _getCategories = (categories) => ({ type: GET_CATEGORIES, categories })