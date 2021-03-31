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
