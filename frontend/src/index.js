import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { ApolloProvider } from 'react-apollo'

import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import RootStore from './models/rootStore'
import { client } from './ApolloClient'

const store = RootStore.create({})

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
