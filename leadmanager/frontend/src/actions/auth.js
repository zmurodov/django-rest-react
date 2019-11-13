import axios from 'axios'
import {returnErrors} from './messsages'

import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

// Check token and load user

export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({type:USER_LOADING})


    axios.get('/api/auth/user', tokenConfig(getState))
         .then(res => {
             dispatch({
                 type: USER_LOADED,
                 payload: res.data
             })
         }).catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status))
             dispatch({
                 type:AUTH_ERROR
             })
         })
}


export const login = (username, password) => dispatch => {

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body

    const body = JSON.stringify({username, password})

    axios.post('/api/auth/login',body, config)
         .then(res => {
             dispatch({
                 type: LOGIN_SUCCESS ,
                 payload: res.data
             })
         }).catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status))
             dispatch({
                 type:LOGIN_FAIL
             })
         })
}


export const register = ({ username, password, email }) => dispatch => {

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // request body
    const body = JSON.stringify({username, email, password})

    axios.post('/api/auth/register',body, config)
         .then(res => {
             dispatch({
                 type: REGISTER_SUCCESS ,
                 payload: res.data
             })
         }).catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status))
             dispatch({
                 type:REGISTER_FAIL
             })
         })
}

// Logout user

export const logout = () => (dispatch, getState) => {

    //Get the token from state
    

    axios.post('/api/auth/logout/',null,  tokenConfig(getState))
         .then(res => {
             dispatch({
                 type: LOGOUT_SUCCESS
             })
         }).catch(err => {
             dispatch(returnErrors(err.response.data, err.response.status))
         })
}

// setup config with token

export const tokenConfig = getState => {
    const token = getState().auth.token

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token , add to headers config
    if(token){
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}