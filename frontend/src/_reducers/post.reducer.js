import { postConstants } from '../_constants'

const initialState = {
  posts: []
}

export function post (state = initialState, action) {
  switch (action.type) {
    case postConstants.GET_ALL_POST_REQUEST:
      return { ...state }
    case postConstants.GET_ALL_POST_SUCCESS:
      state.posts = action.posts
      return {
        ...state,
        posts: action.posts
      }
    case postConstants.GET_ALL_POST_FAILED:
      return { ...state }
    case postConstants.CREATE_POST_REQUEST:
      return { ...state }
    case postConstants.CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: action.posts
      }
    case postConstants.CREATE_POST_FAILED:
      return { ...state }
    case postConstants.DELETE_POST_REQUEST:
      return { ...state }
    case postConstants.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: action.posts
      }
    case postConstants.DELETE_POST_FAILED:
      return { ...state }
    case postConstants.GET_POST_BY_ID_REQUEST:
      return { ...state }
    case postConstants.GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        post: action.post
      }
    case postConstants.GET_POST_BY_ID_FAILED:
      return { ...state }
    case postConstants.UPDATE_POST_REQUEST:
      return { ...state }
    case postConstants.UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: action.posts,
        isCreate: true
      }
    case postConstants.UPDATE_POST_FAILED:
      return { ...state }
    default:
      return state
  }
}

export function formStatus (state = { isCreate: true }, action) {
  switch (action.type) {
    case postConstants.IS_CREATE:
      return {
        isCreate: true
      }
    case postConstants.IS_UPDATE:
      return {
        isCreate: false
      }
    default:
      return state
  }
}
