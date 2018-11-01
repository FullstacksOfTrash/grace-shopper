

import { GET_ORDERS, UPDATE_ORDER, REMOVE_ORDERS } from './actionTypes';
import { GET_PRODUCTS, GET_CATEGORIES, CREATE_PRODUCT } from './actionTypes';
import { CREATE_REVIEW, DELETE_REVIEW, GET_PRODUCT_REVIEWS, EDIT_REVIEW } from './actionTypes';
import { SET_AUTH, LOGOUT } from './actionTypes';
import { GET_PRODUCT_IMAGES } from './actionTypes'


// Products
export const _getProducts = (products) => ({ type: GET_PRODUCTS, products });
export const _createProduct = (product) => ({ type: CREATE_PRODUCT, product })

// Orders
export const _getOrders = (orders)=> ({ type: GET_ORDERS, orders });
export const _updateOrder = (order)=> ({ type: UPDATE_ORDER, order });
export const _removeOrders = () => ({ type: REMOVE_ORDERS })

// Reviews
export const _createReview = (review) => ({ type: CREATE_REVIEW, review})
export const _deleteReview = (reviewId) => ({ type: DELETE_REVIEW, reviewId})
export const _getProductReviews = (reviews) => ({type: GET_PRODUCT_REVIEWS, reviews})
export const _editReview = (update) => ({ type: EDIT_REVIEW, update})

// Images
export const _getProductImages = (images) => ({ type: GET_PRODUCT_IMAGES, images})

// Auth
export const _setAuth = user => ({ type: SET_AUTH, user})
export const _logOut = () => ({ type: LOGOUT })

// Categories
export const _getCategories = (categories) => ({ type: GET_CATEGORIES, categories })
