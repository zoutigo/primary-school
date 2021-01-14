import {
  SET_CREDENTIALS,
  SET_TOKEN,
  SET_TOKEN_VALIDITY,
  IS_LOGGED,
  REFRESH_TOKEN,
} from './userActionsTypes'

import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  isLogged: false,
  Token: {
    token: '',
    tokenIsValid: false,
  },
  Credentials: {
    firstname: '',
    name: '',
    role: '',
    id: '',
  },
}

export const userReducers = createReducer(initialState, {
  SET_TOKEN: (state, action) => {
    state.Token.token = action.payload
  },
  SET_TOKEN_VALIDITY: (state, action) => {
    state.Token.tokenIsValid = action.payload
  },
  SET_CREDENTIALS: (state, action) => {
    state.Credentials = action.payload
  },
  IS_LOGGED: (state) => {
    state.isLogged = !state.isLogged
  },
})

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      const newToken = { ...state.Token }
      newToken.token = action.payload
      return {
        ...state,
        Token: newToken,
      }
    case SET_TOKEN_VALIDITY:
      const newTokenValid = { ...state.Token }
      newTokenValid.tokenIsValid = action.payload
      return {
        ...state,
        Token: newTokenValid,
      }

    case REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload,
      }

    case SET_CREDENTIALS:
      const newCredentials = { ...state.Credentials }
      newCredentials.firstname = action.payload.firstname
      newCredentials.name = action.payload.name
      newCredentials.role = action.payload.role
      newCredentials.id = action.payload.id
      return {
        ...state,
        Credentials: newCredentials,
      }

    case IS_LOGGED:
      return {
        ...state,
        isLogged: !state.isLogged,
      }

    default:
      return initialState
  }
}
