import gql from 'graphql-tag'

export const POST_QUERY = gql`
  query {
    posts {
      error {
        message
        statusCode
      }
      data {
        id
        title
        description
        createdAt
        updatedAt
      }
    }
  }
`

export const POST_WITH_ID_QUERY = gql`
  query PostQuery($id: String!) {
    post(id: $id) {
      error {
        message
        statusCode
      }
      data {
        id
        title
        description
      }
    }
  }
`

export const POST_DELETE_MUTATION = gql`
  mutation DeletePostMutation($id: String!) {
    deletePost(id: $id) {
      error {
        message
        statusCode
      }
      data {
        id
        title
        description
      }
    }
  }
`

export const POST_UPDATE_MUTATION = gql`
  mutation UpdatePostMutation(
    $id: String!
    $title: String!
    $description: String!
  ) {
    updatePost(id: $id, title: $title, description: $description) {
      error {
        message
        statusCode
      }
      data {
        id
        title
        description
      }
    }
  }
`

export const POST_CREATE_MUTATION = gql`
  mutation CreatePostMutation($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      error {
        message
        statusCode
      }
      data {
        id
        title
        description
      }
    }
  }
`

export const LOGIN_QUERY = gql`
  query LoginQuery($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      id
      username
      firstName
      lastName
      token
    }
  }
`

export const CHECK_LOGGEDIN_QUERY = gql`
  query CheckLoggedIn($token: String!) {
    checkLoggedIn(token: $token) {
      isLogged
      user {
        id
        username
        firstName
        lastName
        token
      }
    }
  }
`

export const USER_EXIST = gql`
  query UserExist($username: String!) {
    userExist(username: $username) {
      exist
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $address: String!
  ) {
    register(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
    ) {
      error {
        message
        statusCode
      }
      data {
        id
        username
        firstName
        lastName
        address
      }
    }
  }
`
