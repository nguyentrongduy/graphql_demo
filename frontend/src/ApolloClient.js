import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  request: operation => {
    const userLocal = window.localStorage.getItem('user')
    const { token } = JSON.parse(userLocal || '{}')
    operation.setContext({
      headers: {
        authorization: userLocal && token ? `${token}` : ''
      }
    })
  }
})
