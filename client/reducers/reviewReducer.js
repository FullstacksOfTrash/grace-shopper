import axios from 'axios'

// *** action types *** \\
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const CREATE_REVIEW = 'CREATE_REVIEW'

// *** action creators *** \\
const _getAllReviews = (reviews) => ({ type: GET_ALL_REVIEWS, reviews})
const _createReview = (review) => ({ type: CREATE_REVIEW, review})

// *** thunks *** \\
const getAllReviews = (reviews) => {
  return (dispatch) => {
    axios.get('/api/reviews')
      .then(response => response.data)
      .then(reviews => dispatch(_getAllReviews(reviews)))
      .catch(error => console.log(error.message))
  }
}

const createReview = (review) => {
  return (dispatch) => {
    axios.post(`/api/products/${id}/reviews`, review)
      .then(response => response.data)
      .then(review => dispatch(_createReview(review)))
      .catch(error => console.log(error.message))
  }
}

// *** reducer *** \\
const reviewReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      return [...state, action.review]
    case GET_ALL_REVIEWS:
      return action.reviews
  }
  return state;
}

export { reviewReducer, createReview, getAllReviews }
