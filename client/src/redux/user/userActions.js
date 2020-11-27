import {SET_CREDENTIALS, SET_TOKEN, REFRESH_TOKEN} from './userActionsTypes'

export const setToken = (token)=> {
    return {
        type: SET_TOKEN ,
        payload: token
    }
}

export const setCredentials = (credentials)=> {
    return {

        type: SET_CREDENTIALS ,
        payload: credentials
    }
}

export const refreshToken = (newToken) => {
    return {
        type: REFRESH_TOKEN,
        payload: newToken
    }
}