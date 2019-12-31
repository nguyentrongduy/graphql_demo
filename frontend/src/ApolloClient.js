import ApolloClient from 'apollo-boost'
import fetch from 'node-fetch'

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  fetch: fetch,
  request: operation => {
    let userLocal = null
    if (process.browser) {
      userLocal = window.localStorage.getItem('user')
    }
    const { token } = JSON.parse(userLocal || '{}')
    operation.setContext({
      headers: {
        authorization: userLocal && token ? `${token}` : ''
      }
    })
  }
})
