import axios from 'axios'

//action types
const SET_AUTH = 'SET_AUTH'
const LOGOUT = 'LOGOUT'

//action creators
const _setAuth = user => ({ type: SET_AUTH, user})
const _logOut = () => ({ type: LOGOUT })

//thunks
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

const authReducer = (state = { user: {} }, action) => {
    switch(action.type){
        case SET_AUTH:
            return { user: action.user }
        case LOGOUT:
            return { user: {}}
        default:
            return state
    }
}

export default authReducer