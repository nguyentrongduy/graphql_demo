import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
// let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user, redirectAfterLogin: false } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
        redirectAfterLogin: false
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
        redirectAfterLogin: true
      };
    case userConstants.LOGIN_FAILURE:
      return {
        redirectAfterLogin: false
      };
    case userConstants.LOGOUT:
      return {
        redirectAfterLogin: false
      };
    default:
      return state
  }
}