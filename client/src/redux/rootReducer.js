import { combineReducers } from 'redux'
import { userReducer } from './user/userReducers'
import { settingsReducers } from './settings/settingsReducers'

export const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducers,
})
