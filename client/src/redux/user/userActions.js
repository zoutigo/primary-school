import {
  SET_CREDENTIALS,
  SET_TOKEN,
  SET_TOKEN_VALIDITY,
  REFRESH_TOKEN,
  IS_LOGGED,
} from './userActionsTypes'

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token,
  }
}
export const setTokenValidity = (validity) => {
  return {
    type: SET_TOKEN_VALIDITY,
    payload: validity,
  }
}

export const setCredentials = (credentials) => {
  return {
    type: SET_CREDENTIALS,
    payload: credentials,
  }
}

export const refreshToken = (newToken) => {
  return {
    type: REFRESH_TOKEN,
    payload: newToken,
  }
}

export const setIsLogged = () => {
  return {
    type: IS_LOGGED,
  }
}
