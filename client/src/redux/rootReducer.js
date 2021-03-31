import { combineReducers } from 'redux'

import { userReducers } from './user/userReducers'
import { settingsReducers } from './settings/settingsReducers'
import { adminReducers } from './admin/adminReducers'
import { papersReducers } from './papers/papersReducers'

const rootReducer = combineReducers({
  settings: settingsReducers,
  user: userReducers,
  admin: adminReducers,
  papers: papersReducers,
})

export default rootReducer
