import {
    get as _get
} from 'lodash';
import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    userExist
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                data => {
                    if (_get(data, 'login.ok')) {
                        dispatch(success(data));
                    } else {
                        dispatch(alertActions.error('username or password is incorrect'));
                        dispatch(failure(null))
                    }
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function userExist(exist) {
    return dispatch => {
        dispatch(request());

        userService.userExist(exist)
            .then(
                exist => {
                    dispatch(success(exist));
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: userConstants.EXIST_USER_REQUEST, exist: false } }
    function success(exist) { return { type: userConstants.EXIST_USER_SUCCESS, exist } }
    function failure(error) { return { type: userConstants.EXIST_USER_FAILED, error } }
}
