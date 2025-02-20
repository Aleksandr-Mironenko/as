import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { thunk as reduxThunk } from 'redux-thunk'

import reducer from './components/reducer'
import App from './components/App'
import delayMiddleware from './components/delayMiddleware'
// import delayMiddlewareFetch from './components/delayMiddlewareFetch'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk, delayMiddleware))) //,delayMiddlewareFetch
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
