import axios from 'axios';

import { _getProducts } from './actionCreators';
import { _getOrders, _updateOrder } from './actionCreators';
import { _getAllReviews, _createReview } from './actionCreators';
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
    console.log('calling get orders')
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
        const user = getState().auth;
        axios.get(`/api/users/${user.id}/orders/${order.id}`, authHeader())
            .then(response => response.data)
            .then(order => dispatch(_updateOrder(order)))
            .then(()=> {
                axios.get(`/api/users/${user.id}/orders`) // after updating the order, load all of the user's orders again to normalize data
                    .then(response => response.data)
                    .then(orders => dispatch(_getOrders(orders)))
            })
    }
}

export const addToCart = (cart, product, lineItem)=> {
    return (dispatch, getState)=> {
        const user = getState().auth;
        if (lineItem) {
            axios.put(`/api/users/${user.id}/orders/${cart.id}/lineItems/${lineItem.id}`, { quantity: ++lineItem.quantity }, authHeader())
                .then(()=> {
                    axios.get(`/api/users/${user.id}/orders`, authHeader())
                        .then(response => response.data)
                        .then( orders => dispatch(_getOrders(orders)))
                })
        } else {
            axios.post(`/api/users/${user.id}/orders/${cart.id}`, { productId: product.id, quantity: 1 }, authHeader())
                .then(()=> {
                    axios.get(`/api/users/${user.id}/orders`, authHeader())
                        .then(response => response.data)
                        .then(orders => dispatch(_getOrders(orders)))
                })
        }
    }
}

export const removeFromCart = (cart, lineItem)=> {
    // return (dispatch, getState())=> {
    //     const user = getState().auth;
    //     if (lineItem.quantity <== 1) {

    //     } else {

    //     }
    // }
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
