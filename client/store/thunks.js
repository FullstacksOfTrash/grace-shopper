import axios from 'axios';

import { _getProducts } from './actionCreators';
import { _getOrders, _updateOrder } from './actionCreators';
import { _getAllReviews, _createReview } from './actionCreators';
import { _setAuth, _logOut } from './actionCreators';
import { _getCategories } from './actionCreators';
import { _getOrders } from './actionCreators'

import authHeader from './utils';

//PRODUCTS
export const getProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(_getProducts(products)))
      .catch(error => console.log(error.message))
  }
}

//ORDERS
export const getOrders = ()=> {
    return (dispatch, getState)=> {
        const user = getState().auth;
        axios.get(`/api/users/${user.id}/orders`, authHeader())
            .then(response => response.data)
            .then(orders => dispatch(_getOrders(orders)))
    }
}

export const updateOrder = (order)=> {
    return (dispatch, getState)=> {
        const user = getState().auth;
        axios.get(`/api/users/${user.id}/orders/${order.id}`)
            .then(response => response.data)
            .then(order => dispatch(_updateOrder(order)))
            .then(()=> {
                axios.get(`/api/users/${user.id}/orders`) // after updating the order, load all of the user's orders again to normalize data
                    .then(response => response.data)
                    .then(orders => dispatch(_getOrders(orders)))
            })
    }
}

//LINE ITEMS
export const createLineItem = (lineItem)=> {

}

export const deleteLineItem = (lineItem)=> {

}

export const updateLineItem = (lineItem)=> {

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
    return dispatch => {
        const token = window.localStorage.getItem('token')
        if(!token){
            return;
        }
        return axios.get('/api/auth', {
            headers : {
                authorization : token
            }
        })
        .then( response => response.data )
        .then( auth => {
            dispatch(_setAuth(auth))
        })
        .then(()=> {
            dispatch(getOrders())
            if (history) {
                history.push('/products');
            }
        })
        .catch(ex => {
            console.log(ex);
            window.localStorage.removeItem('token');
        })
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

// CATEGORIES
export const getCategories = () => {
  return (dispatch) => {
    axios.get('/api/categories')
      .then(response => dispatch(_getCategories(response.data)))
      .catch(err => console.log(err.message))
  }
}