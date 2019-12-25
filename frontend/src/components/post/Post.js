import React, { Component } from 'react'
import { connect } from 'react-redux'

import { postActions } from '../../_actions/post.actions'
import { PostCreateForm } from '../post-create-form/PostCreateForm'
import { PostUpdateForm } from '../post-update-form/PostUpdateForm'

class Post extends Component {
  constructor (props) {
    super(props)
    this.props.getAllPost()
  }

  setFormStatus (status) {
    this.props.setFormStatus(status)
  }

  handleDeletePost (id, title) {
    if (window.confirm(`Delete ${title}?`)) {
      this.props.deletePost(id)
    }
  }

  handleGetPostById (id) {
    this.props.getPostById(id)
  }

  render () {
    const { posts, post, isCreate } = this.props
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
                posts.data &&
                posts.data.map((post, index) => {
                  return (
                    <tr key={index}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>
                        <div>
                          <button
                            className='btn btn-warning'
                            onClick={() => {
                              this.handleDeletePost(post.id, post.title)
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className='btn btn-info'
                            onClick={() => {
                              this.handleGetPostById(post.id)
                              this.setFormStatus(false)
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              {(!posts || !posts.data || posts.data.length === 0) && (
                <tr>
                  <td className='no-content' colSpan='4'>
                    No Content!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {isCreate ? (
          <div className='col-4'>
            <PostCreateForm />
          </div>
        ) : null}
        {!isCreate && post ? (
          <div className='col-4'>
            <button
              className='btn btn-success'
              onClick={() => {
                this.setFormStatus(true)
              }}
            >
              Create
            </button>
            <PostUpdateForm />
          </div>
        ) : null}
      </div>
    )
  }
}

function mapState (state) {
  const { post, formStatus } = state
  return { posts: post.posts, post: post.post, isCreate: formStatus.isCreate }
}

const actionCreators = {
  getAllPost: postActions.getAllPost,
  deletePost: postActions.deletePost,
  getPostById: postActions.getPostById,
  setFormStatus: postActions.setFormStatus
}

const connectedPostPage = connect(mapState, actionCreators)(Post)
export { connectedPostPage as Post }
