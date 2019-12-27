const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    posts: PostsResponse
    post(id: String!): PostResponse
    login(username: String!, password: String!): Login!
    userExist(username: String!): UserExist,
    checkLoggedIn(token: String!): CheckLoggedInResponse!
  }

  type Subscription {
    newPost: Post
  }

  type Mutation {
    createPost(title: String!, description: String!): PostsResponse!
    deletePost(id: String!): PostsResponse!
    updatePost(
      id: String!
      title: String!
      description: String!
    ): PostsResponse!
    register(
      username: String!
      password: String!
      firstName: String!
      lastName: String!
      address: String!
    ): RegisterResponse!
  }

  type PostsResponse {
    error: [Error]
    data: [Post]
  }

  type PostResponse {
    error: [Error]
    data: Post
  }

  type RegisterResponse {
    error: [Error]
    data: Register
  }

  type Post {
    id: String
    title: String
    description: String
    createdAt: String
    updatedAt: String
  }

  type CheckLoggedInResponse {
    isLogged: Boolean!
  }

  type Login {
    ok: Boolean!
    id: Int
    username: String
    firstName: String
    lastName: String
    token: String
  }

  type Register {
    id: Int!
    username: String!
    firstName: String!
    lastName: String!
    address: String!
  }

  type Error {
    message: String!
    statusCode: Int!
  }

  type UserExist {
    exist: Boolean!
  }
`
module.exports = {
  typeDefs
}
