import { combineReducers } from 'redux'

import { userReducers } from './user/userReducers'
import { settingsReducers } from './settings/settingsReducers'

const rootReducer = combineReducers({
  settings: settingsReducers,
  user: userReducers,
})

export default rootReducer
