import rootReducer from './rootReducer'
import { userReducers } from './user/userReducers'
import { settingsReducers } from './settings/settingsReducers'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = configureStore({
    reducer: {
      user: userReducers,
      settings: settingsReducers,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
  let persistor = persistStore(store)

  return { store, persistor }
}
