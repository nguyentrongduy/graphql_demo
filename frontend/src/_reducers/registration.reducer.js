import { userConstants } from '../_constants'

export function registration (state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true }
    case userConstants.REGISTER_SUCCESS:
      return {}
    case userConstants.REGISTER_FAILURE:
      return {}
    case userConstants.EXIST_USER_REQUEST:
      return { exist: false }
    case userConstants.EXIST_USER_SUCCESS:
      return { exist: action.exist }
    case userConstants.EXIST_USER_FAILED:
      return { exist: false }
    default:
      return state
  }
}
