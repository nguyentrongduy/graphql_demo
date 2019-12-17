import { postConstants } from '../_constants';

export function post(state = {}, action) {
    switch (action.type) {
        case postConstants.GET_ALL_POST_REQUEST:
            return {};
        case postConstants.GET_ALL_POST_SUCCESS:
            return {
                posts: action.posts
            };
        case postConstants.GET_ALL_POST_FAILED:
            return {};
        default:
            return state
    }
}