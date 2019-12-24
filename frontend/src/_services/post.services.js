import { isNil as _isNil } from 'lodash'
import {
  POST_QUERY,
  POST_WITH_ID_QUERY,
  POST_CREATE_MUTATION,
  POST_DELETE_MUTATION,
  POST_UPDATE_MUTATION
} from '../_resolvers/resolvers'
import { client } from '../ApolloClient'

export const postService = {
  getAllPost,
  getPostById,
  createPost,
  deletePost,
  updatePost
}

function getAllPost () {
  return client
    .query({
      query: POST_QUERY
    })
    .then(response => {
      if (_isNil(response, 'data.posts')) {
        return null
      }
      return response.data.posts
    })
}

function getPostById (id) {
  return client
    .query({
      query: POST_WITH_ID_QUERY,
      variables: { id }
    })
    .then(response => {
      if (_isNil(response, 'data.post')) {
        return null
      }
      return response.data.post
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
      return result.data.post
    })
}
