

import { GET_ORDERS, UPDATE_ORDER, REMOVE_ORDERS } from './actionTypes';
import { GET_PRODUCTS, GET_CATEGORIES, CREATE_PRODUCT, DELETE_PRODUCT} from './actionTypes';
import { CREATE_REVIEW, DELETE_REVIEW, GET_PRODUCT_REVIEWS, EDIT_REVIEW } from './actionTypes';
import { SET_AUTH, LOGOUT } from './actionTypes';
import { SET_QUERY, REMOVE_QUERY} from './actionTypes'


// Products
export const _getProducts = (products) => ({ type: GET_PRODUCTS, products });
export const _createProduct = (product) => ({ type: CREATE_PRODUCT, product })
export const _deleteProduct = (product) => ({ type: DELETE_PRODUCT, product })

// Orders
export const _getOrders = (orders)=> ({ type: GET_ORDERS, orders });
export const _updateOrder = (order)=> ({ type: UPDATE_ORDER, order });
export const _removeOrders = () => ({ type: REMOVE_ORDERS })

// Reviews
// export const _getAllReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews})
export const _createReview = (review) => ({ type: CREATE_REVIEW, review})
export const _deleteReview = (reviewId) => ({ type: DELETE_REVIEW, reviewId})
export const _getProductReviews = (reviews) => ({type: GET_PRODUCT_REVIEWS, reviews})
export const _editReview = (update) => ({ type: EDIT_REVIEW, update})

// Auth
export const _setAuth = user => ({ type: SET_AUTH, user})
export const _logOut = () => ({ type: LOGOUT })

// Categories
export const _getCategories = (categories) => ({ type: GET_CATEGORIES, categories })

// Query
export const _query = query => ({ type: SET_QUERY, query})
export const _resetQuery = () => ({ type: REMOVE_QUERY, reset: '' })