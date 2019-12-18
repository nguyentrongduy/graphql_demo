import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ApolloConsumer } from 'react-apollo'

import { postActions } from '../../_actions/post.actions'
import { POST_MUTATION, POST_WITH_ID_QUERY } from '../../_resolvers/resolvers'
import { isNil as _isNil, get as _get } from 'lodash'
import PostCreateForm from '../post-create-form/PostCreateForm'
import PostUpdateForm from '../post-update-form/PostUpdateForm'

class Post extends Component {
  constructor (props) {
    super(props)
    this.props.getAllPost()

    this.state = {
      isCreate: true,
      data: null
    }

    this.setFormStatusHandler = this.setFormStatus.bind(this)
  }

  /**
   * handle on click Edit
   * @param {Post} data post data
   */
  updateFormData (data) {
    this.setFormStatus(false)
    this.setState({ ...this.state, data })
  }

  /**
   * set form status
   * @param {boolean} status is create
   */
  setFormStatus (status) {
    this.setState({ ...this.state, isCreate: status })
  }

  render () {
    const { posts } = this.props
    console.log('props')
    console.log(this.props)
    return (
      <div className='Post row'>
        <div className='col-12'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Description</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.data.map((post, index) => {
                  return (
                    <tr key={index}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>
                        <ApolloConsumer>
                          {client => (
                            <div>
                              <button
                                className='btn btn-warning'
                                onClick={async () => {
                                  if (window.confirm(`Delete ${post.title}`)) {
                                    await client.mutate({
                                      mutation: POST_MUTATION,
                                      variables: { id: post.id }
                                    })
                                  }
                                }}
                              >
                                Delete
                              </button>
                              <button
                                className='btn btn-info'
                                onClick={async () => {
                                  const { data } = await client.query({
                                    query: POST_WITH_ID_QUERY,
                                    variables: { id: post.id }
                                  })
                                  this.updateFormData(data.post.data)
                                }}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </ApolloConsumer>
                      </td>
                    </tr>
                  )
                })}
              {(_isNil(_get(posts, 'data')) || posts.data.length === 0) && (
                <tr>
                  <td className='no-content' colSpan='4'>
                    No Content!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {this.state.isCreate ? (
          <div className='col-4'>
            <PostCreateForm />
          </div>
        ) : (
          <div className='col-4'>
            <button
              className='btn btn-success'
              onClick={() => {
                this.setFormStatusHandler(true)
              }}
            >
              Create
            </button>
            <PostUpdateForm data={this.state.data} />
          </div>
        )}
      </div>
    )
  }
}

function mapState (state) {
  const { posts } = state.post
  return { posts }
}

const actionCreators = {
  getAllPost: postActions.getAllPost
}

const connectedPostPage = connect(mapState, actionCreators)(Post)
export { connectedPostPage as Post }
