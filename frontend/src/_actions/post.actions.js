import { postConstants } from '../_constants'
import { postService } from '../_services'
import { alertActions } from './alert.actions'

export const postActions = {
  getAllPost,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  setFormStatus
}

function getAllPost () {
  return dispatch => {
    dispatch(request())

    postService.getAllPost().then(
      posts => {
        dispatch(success(posts))
      },
      error => {
        dispatch(failure(error))
      }
    )
  }

  function request (posts) {
    return { type: postConstants.GET_ALL_POST_REQUEST, posts }
  }
  function success (posts) {
    return { type: postConstants.GET_ALL_POST_SUCCESS, posts }
  }
  function failure (error) {
    return { type: postConstants.GET_ALL_POST_FAILED, error }
  }
}

function getPostById (id) {
  return dispatch => {
    dispatch(request())

    postService.getPostById(id).then(
      post => {
        dispatch(success(post))
      },
      error => {
        dispatch(failure(error))
        dispatch(alertActions.error(error))
      }
    )
  }

  function request (post) {
    return { type: postConstants.GET_POST_BY_ID_REQUEST, post }
  }
  function success (post) {
    return { type: postConstants.GET_POST_BY_ID_SUCCESS, post }
  }
  function failure (error) {
    return { type: postConstants.GET_POST_BY_ID_FAILED, error }
  }
}

function createPost (title, description) {
  return dispatch => {
    dispatch(request())

    postService.createPost(title, description).then(
      posts => {
        dispatch(success(posts))
      },
      error => {
        dispatch(failure(error))
      }
    )
  }

  function request () {
    return { type: postConstants.CREATE_POST_REQUEST }
  }

  function success (posts) {
    return { type: postConstants.CREATE_POST_SUCCESS, posts }
  }

  function failure (error) {
    return { type: postConstants.CREATE_POST_FAILED, error }
  }
}

function deletePost (id) {
  return dispatch => {
    dispatch(request())
    postService.deletePost(id).then(
      posts => {
        dispatch(success(posts))
      },
      error => {
        dispatch(failure(error))
      }
    )
  }

  function request () {
    return { type: postConstants.DELETE_POST_REQUEST }
  }

  function success (posts) {
    return { type: postConstants.DELETE_POST_SUCCESS, posts }
  }

  function failure (error) {
    return { type: postConstants.DELETE_POST_FAILED, error }
  }
}

function updatePost (id, title, description) {
  return dispatch => {
    dispatch(request())

    postService.updatePost(id, title, description).then(
      post => {
        dispatch(success(post))
      },
      error => dispatch(failure(error))
    )
  }

  function request () {
    return { type: postConstants.UPDATE_POST_REQUEST }
  }

  function success (post) {
    return { type: postConstants.UPDATE_POST_SUCCESS, post }
  }

  function failure (error) {
    return { type: postConstants.UPDATE_POST_FAILED, error }
  }
}

function setFormStatus (status) {
  return dispatch => {
    if (status) {
      dispatch({ type: postConstants.IS_CREATE })
    } else {
      dispatch({ type: postConstants.IS_UPDATE })
    }
  }
}
