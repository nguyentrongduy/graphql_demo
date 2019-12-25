import {
  LOGIN_QUERY,
  REGISTER_MUTATION,
  USER_EXIST
} from '../_resolvers/resolvers'
import { client } from '../ApolloClient'

export const userService = {
  login,
  logout,
  register,
  userExist
}

function login (username, password) {
  return client
    .query({
      query: LOGIN_QUERY,
      fetchPolicy: 'no-cache',
      variables: { username, password }
    })
    .then(handleLoginResponse)
    .then(data => {
      const user = data.login
      if (data.login.ok) {
        window.localStorage.setItem('user', JSON.stringify(user))
      }
      return data
    })
}

function logout () {
  window.localStorage.removeItem('user')
}

function register (user) {
  return client
    .mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        username: user.username,
        password: user.password,
        address: user.address,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
    .then(response => {
      return response.data.register
    })
}

function userExist (username) {
  return client
    .query({
      query: USER_EXIST,
      fetchPolicy: 'no-cache',
      variables: { username }
    })
    .then(response => {
      if (
        response &&
        response.data &&
        response.data.userExist &&
        response.data.userExist.exist
      ) {
        return response.data.userExist.exist
      } else {
        return false
      }
    })
}

function handleLoginResponse (response) {
  if (response && response.data && response.data.login) {
    return response.data
  }
  return null
}
