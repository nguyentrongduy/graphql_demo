import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import { App } from './App'
import registerServiceWorker from './registerServiceWorker'
import { store } from './_helpers'

import { client } from './ApolloClient'

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
