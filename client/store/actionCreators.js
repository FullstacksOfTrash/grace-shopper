import { GET_PRODUCTS } from 'actionCreators';

export const _getProducts = (products) => ({ type: GET_PRODUCTS, products });

export const _getAllReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews})
export const _createReview = (review) => ({ type: CREATE_REVIEW, review})