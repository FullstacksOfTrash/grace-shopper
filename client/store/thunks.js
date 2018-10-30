import axios from 'axios';

import { _getProducts } from './actionCreators';
import { _getOrders, _updateOrder, _removeOrders } from './actionCreators';
import { _createReview, _deleteReview, _getProductReviews, _editReview } from './actionCreators';
import { _setAuth, _logOut } from './actionCreators';
import { _getCategories } from './actionCreators';

import { authHeader } from './utils';

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
        const {user} = getState().auth;
        axios.get(`/api/users/${user.id}/orders`, authHeader())
            .then(response => response.data)
            .then(orders => dispatch(_getOrders(orders)))
            .catch(err => console.log(err.message))
    }
}

export const updateOrder = (order)=> {

    return (dispatch, getState)=> {
        const { user } = getState().auth;
        return axios.put(`/api/users/${user.id}/orders/${order.id}`, {status:'ORDER'}, authHeader())
            .then(()=> {
                axios.get(`/api/users/${user.id}/orders`, authHeader()) // after updating the order, load all of the user's orders again to normalize data
                    .then(response => response.data)
                    .then(orders => dispatch(_getOrders(orders)))
                    .catch(err => console.log(err.message))
            })
            .catch(err => console.log(err.message))
    }
}

export const addToCart = (cart, product, lineItem)=> {
    return (dispatch, getState)=> {
        const { user } = getState().auth
        if (lineItem.id) {
            return axios.put(`/api/users/${user.id}/orders/${cart.id}/lineitems/${lineItem.id}`, { quantity: ++lineItem.quantity }, authHeader())
                .then(()=> {
                    axios.get(`/api/users/${user.id}/orders`, authHeader())
                        .then(response => response.data)
                        .then( orders => dispatch(_getOrders(orders)))
                })
        } else {
            return axios.post(`/api/users/${user.id}/orders/${cart.id}/lineitems`, { productId: product.id, quantity: 1 }, authHeader())
                .then(()=> {
                    axios.get(`/api/users/${user.id}/orders`, authHeader())
                        .then(response => response.data)
                        .then(orders => dispatch(_getOrders(orders)))
                })
        }
    }
}

export const removeFromCart = (cart, lineItem)=> {
    return (dispatch, getState) => {
        const { user } = getState().auth
        if(lineItem.quantity <= 1){
            return axios.delete(`/api/users/${user.id}/orders/${cart.id}/lineitems/${lineItem.id}`, authHeader())
            .then(() => {
                return axios.get(`/api/users/${user.id}/orders`, authHeader())
                    .then(response => response.data)
                    .then(orders => dispatch(_getOrders(orders)))
                    .catch(err => console.log(err))
            })
        } else {
            return axios.put(`/api/users/${user.id}/orders/${cart.id}/lineItems/${lineItem.id}`, { quantity: --lineItem.quantity }, authHeader())
                .then(()=> {
                    axios.get(`/api/users/${user.id}/orders`, authHeader())
                        .then(response => response.data)
                        .then( orders => dispatch(_getOrders(orders)))
                })
        }
    }
}

//REVIEWS
export const getProductReviews = (productId) => {
    return (dispatch) => {
        return axios.get(`/api/reviews/${productId}`)
            .then(response => response.data)
            .then(reviews => dispatch(_getProductReviews(reviews)))
            .catch(error => console.log(error.message))
    }
}

export const createReview = (id, review) => {
  return (dispatch) => {
    return axios.post(`/api/reviews/${id}`, review)
      .then(response => response.data)
      .then(review => dispatch(_createReview(review)))
      .catch(error => console.log(error.message))
  }
}

export const deleteReview = (productId, reviewId) => {
    return (dispatch) => {
        return axios.delete(`/api/reviews/${productId}/${reviewId}`)
            .then(() => dispatch(_deleteReview(reviewId)))
            .catch(error => console.log(error.message))
    }
}

export const editReview = (id, review) => {
    console.log(review)
    return (dispatch) => {
        return axios.put(`/api/reviews/${id}`, review)
            .then(response => response.data)
            .then(review => dispatch(_editReview(review)))
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
        //console.log(credentials)
        const response = await axios.post('/api/auth/', credentials)
        window.localStorage.setItem('token', response.data.token)
        return dispatch(exchangeTokenForAuth(history))
    }
}
export const logOut = history => {
    return dispatch => {
        window.localStorage.removeItem('token')
        dispatch(_logOut())
        dispatch(_removeOrders())
        history.push('/home')
    }
}

export const signUp = (userInfo, history) => {
    return dispatch => {
        return axios.post('/api/auth/create', userInfo)
        .then( user => {
            const { email, password } = user.data
            dispatch(logIn({email, password}, history))})
        .catch((err) => console.log(err))
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
