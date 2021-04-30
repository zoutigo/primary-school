import React from 'react'
import ReactDOM from 'react-dom'

import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/fr'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import theme from './utils/theme'
import * as serviceWorker from './serviceWorker'

import returnStoreAndPersistor from './redux/store'

const { store, persistor } = returnStoreAndPersistor()

moment.locale('fr')

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
              <App />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
