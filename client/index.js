import React, { Fragment } from 'react'
import { render } from 'react-dom'

const app = document.getElementById('app')

import store from './store'
import { Provider } from 'react-redux'
import App from './components'

import CssBaseline from '@material-ui/core/CssBaseline'; // provides base styling for material-ui

render(
  <Provider store = { store } >
    <Fragment>
      <CssBaseline />
      <App />
    </Fragment>
  </Provider>,
  app)