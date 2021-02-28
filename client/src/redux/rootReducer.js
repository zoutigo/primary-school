import { combineReducers } from 'redux'

import { userReducers } from './user/userReducers'
import { settingsReducers } from './settings/settingsReducers'
import { adminReducers } from './admin/adminReducers'

const rootReducer = combineReducers({
  settings: settingsReducers,
  user: userReducers,
  admin: adminReducers,
})

export default rootReducer
