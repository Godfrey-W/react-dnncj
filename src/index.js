import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'amfe-flexible'
import store from './store'
import App from './App'
import './assets/scss/index.scss'

ReactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>),
  document.getElementById('root')
)
