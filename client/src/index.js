import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {ThemeProvider} from '@material-ui/styles'
import theme from './utils/theme'
import {BrowserRouter as Router} from 'react-router-dom'

import {Provider} from 'react-redux'
import {store} from './redux/store'

import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount : false ,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
