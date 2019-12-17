import {
    isNil as _isNil
} from 'lodash';
import {
    POST_QUERY,
    POST_WITH_ID_QUERY
} from '../_resolvers/resolvers';
import { client } from '../ApolloClient';

export const postService = {
    getAllPost,
    getPostById
};

function getAllPost() {
    return client.query({
        query: POST_QUERY,
    }).then(handleAllPostResponse)
        .then(posts => {
            return posts;
        });
}

function handleAllPostResponse(response) {
    if (_isNil(response, 'data.posts')) {
        return null;
    }
    return response.data.posts;
}

function getPostById(id) {
    return client.query({
        query: POST_WITH_ID_QUERY,
        variables: { id }
    }).then(handlePostByIdResponse)
        .then(post => {
            return post;
        });
}

function handlePostByIdResponse(response) {
    if (_isNil(response, 'data.post')) {
        return null;
    }
    return response.data.post;
}
