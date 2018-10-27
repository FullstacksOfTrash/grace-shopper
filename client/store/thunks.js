import axios from 'axios';

import { _getProducts } from './actionCreators';
import { _getAllReviews, _createReview } from './actionCreators';
import { _setAuth, _logOut } from './actionCreators';

//PRODUCTS
export const getProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(_getProducts(products)))
      .catch(error => console.log(error.message))
  }
}

//REVIEWS
export const getAllReviews = (reviews) => {
  return (dispatch) => {
    axios.get('/api/reviews')
      .then(response => response.data)
      .then(reviews => dispatch(_getAllReviews(reviews)))
      .catch(error => console.log(error.message))
  }
}
export const createReview = (review) => {
  return (dispatch) => {
    axios.post(`/api/products/${id}/reviews`, review)
      .then(response => response.data)
      .then(review => dispatch(_createReview(review)))
      .catch(error => console.log(error.message))
  }
}

//AUTH
export const exchangeTokenForAuth = history => {
    return async dispatch => {
        try {
            const token = window.localStorage.getItem('token')
            if(!token){
                return
            }
            const user = await axios.get('/api/auth', { headers : {
                authorization : token
            }})
            dispatch(_setAuth(user.data))
            if(history){
                history.push('/products')
            }
        } catch(err){
            console.log(err)
            window.localStorage.removeItem('token')
        }
    }
}
export const logIn = (credentials, history) => {
    return async dispatch => {
        const response = await axios.post('/api/auth/', credentials)
        window.localStorage.setItem('token', response.data.token)
        return dispatch(exchangeTokenForAuth(history))
    }
}
export const logOut = history => {
    return dispatch => {
        window.localStorage.removeItem('token')
        dispatch(_logOut())
        history.push('/home')
    }
}