import {
  POST_QUERY,
  POST_WITH_ID_QUERY,
  POST_CREATE_MUTATION,
  POST_DELETE_MUTATION,
  POST_UPDATE_MUTATION
} from '../_resolvers/resolvers'
import { client } from '../ApolloClient'

export const PostService = {
  getAllPost,
  getPostById,
  createPost,
  deletePost,
  updatePost
}

function getAllPost () {
  return client
    .query({
      query: POST_QUERY,
      fetchPolicy: 'no-cache'
    })
    .then(response => {
      if (response && response.data && response.data.posts) {
        return response.data.posts
      }
      return null
    })
}

function getPostById (id) {
  return client
    .query({
      query: POST_WITH_ID_QUERY,
      fetchPolicy: 'no-cache',
      variables: { id }
    })
    .then(response => {
      if (response && response.data && response.data.post) {
        return response.data.post
      }
      return null
    })
}

function createPost (title, description) {
  return client
    .mutate({
      mutation: POST_CREATE_MUTATION,
      variables: {
        title,
        description
      }
    })
    .then(result => {
      return result.data.createPost
    })
}

function deletePost (id) {
  return client
    .mutate({
      mutation: POST_DELETE_MUTATION,
      variables: {
        id
      }
    })
    .then(result => {
      return result.data.deletePost
    })
}

function updatePost (id, title, description) {
  return client
    .mutate({
      mutation: POST_UPDATE_MUTATION,
      variables: { id, title, description }
    })
    .then(result => {
      return result.data.updatePost
    })
}
