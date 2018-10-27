import { GET_PRODUCTS } from 'actionTypes';
import { GET_ALL_REVIEWS, CREATE_REVIEW } from 'actionTypes';

export const _getProducts = (products) => ({ type: GET_PRODUCTS, products });

export const _getAllReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews})
export const _createReview = (review) => ({ type: CREATE_REVIEW, review})

export const _setAuth = user => ({ type: SET_AUTH, user})
export const _logOut = () => ({ type: LOGOUT })