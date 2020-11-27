import {combineReducers} from 'redux'
import {token, setCredential} from './user/userReducers'
import { settingsReducers } from './settings/settingsReducers'

export const rootReducer = combineReducers({
    token,
    credentials : setCredential,
    settings : settingsReducers
   
})