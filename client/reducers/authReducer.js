import axios from 'axios'

//action types
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

//action creators
const _logIn = user => ({ type: LOGIN, user})
const _logOut = () => ({ type: LOGOUT })

//thunks




const authReducer = (state = { user: {} }, action) => {
    switch(action.type){
        case LOGIN:
            return { user: action.user }
        case LOGOUT:
            return { user: {}}
        default:
            return state
    }
}

export default authReducer