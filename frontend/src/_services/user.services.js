import {
  LOGIN_QUERY,
  REGISTER_MUTATION,
  USER_EXIST,
  CHECK_LOGGEDIN_QUERY
} from '../_resolvers/resolvers'
import { getClient } from '../ApolloClient'

export const UserService = {
  login,
  register,
  userExist,
  checkLoggedIn
}

function login (username, password) {
  return getClient()
    .query({
      query: LOGIN_QUERY,
      fetchPolicy: 'no-cache',
      variables: { username, password }
    })
    .then(handleLoginResponse)
    .then(data => {
      return data.login
    })
}

function checkLoggedIn (token) {
  return getClient()
    .query({
      query: CHECK_LOGGEDIN_QUERY,
      fetchPolicy: 'no-cache',
      variables: { token }
    })
    .then(resp => {
      return resp.data.checkLoggedIn
    })
}

function register (user) {
  return getClient()
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
  return getClient()
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
