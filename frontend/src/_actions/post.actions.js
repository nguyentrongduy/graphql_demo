import { postConstants } from '../_constants'
import { postService } from '../_services'
import { alertActions } from './alert.actions'

export const postActions = {
  getAllPost,
  getPostById
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
        // dispatch(alertActions.error(error))
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
