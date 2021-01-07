import {
  SET_CREDENTIALS,
  SET_TOKEN,
  IS_LOGGED,
  REFRESH_TOKEN,
} from './userActionsTypes'

const initialState = {
  isLogged: false,
  token: '',
  credentials: {
    firstname: '',
    name: '',
    role: '',
    id: '',
  },
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case REFRESH_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case SET_CREDENTIALS:
      return {
        ...state,
        firstname: action.payload.firstname,
        name: action.payload.name,
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
