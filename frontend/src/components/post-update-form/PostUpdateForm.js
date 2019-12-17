import React, { Component } from 'react';
import { graphql, ApolloConsumer } from 'react-apollo';
import { client } from '../../ApolloClient';
import {
    POST_WITH_ID_QUERY,
    POST_UPDATE_MUTATION
} from '../../_resolvers/resolvers';


class PostUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            description: '',
            prevId: null
        }
    }

    componentDidUpdate() {
        if (this.props.data.id && this.props.data.id !== this.state.prevId) {

            client.query({
                query: POST_WITH_ID_QUERY,
                variables: { id: this.props.data.id }
            }).then(response => {
                const post = response.data.post.data;
                this.setState({
                    ...this.state,
                    id: post.id,
                    title: post.title,
                    description: post.description,
                    prevId: post.id
                });
                console.log(response);
            });
        }
    }

    render() {
        let { id, title, description } = this.state
        return (
            <div className='col-xs-12'>
                <h2>Update</h2>
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
                                    mutation: POST_UPDATE_MUTATION,
                                    variables: { id, title, description }
                                });
                                console.log(this.state)
                                console.log(data)
                            }}
                        >
                            Update
                    </button>
                    )}
                </ApolloConsumer>
            </div>
        )
    }
}

const UpdatePostWithParams = graphql(POST_UPDATE_MUTATION)(PostUpdateForm);

export default UpdatePostWithParams;
