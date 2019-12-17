import React, { Component } from 'react'
import { graphql, ApolloConsumer } from 'react-apollo';
import {
    POST_CREATE_MUTATION
} from '../../_resolvers/resolvers';

class PostCreateForm extends Component {
    state = {
        title: '',
        description: ''
    }

    render() {
        let { title, description } = this.state
        return (
            <div className='col-12'>
                <h2>Create</h2>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id='title'
                        className="form-control"
                        value={title}
                        onChange={e => this.setState({ title: e.target.value })}
                        type="text"
                        placeholder="title for the post"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id='description'
                        className="form-control"
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="description for the post"
                    />
                </div>
                <ApolloConsumer>
                    {client => (
                        <button className='btn btn-success'
                            onClick={async () => {
                                const { data } = await client.mutate({
                                    mutation: POST_CREATE_MUTATION,
                                    variables: { title, description }
                                });
                                console.log(data)
                            }}
                        >
                            Create
                    </button>
                    )}
                </ApolloConsumer>
            </div>
        )
    }
}

const CreatePostWithParams = graphql(POST_CREATE_MUTATION)(PostCreateForm);

export default CreatePostWithParams;
