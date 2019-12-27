import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import PostCreateForm from '../post-create-form/PostCreateForm'
import PostUpdateForm from '../post-update-form/PostUpdateForm'

class Post extends Component {
  constructor (props) {
    super(props)
    this.props.store.getAllPost()
    this.store = this.props.store
  }

  setFormStatus (status) {
    this.props.setFormStatus(status)
  }

  handleDeletePost (func, title) {
    if (window.confirm(`Delete ${title}?`)) {
      return func().then(resp => {
        if (resp && resp.error && resp.error.length > 0) {
        } else {
          this.props.store.setPostsData(resp.data)
        }
      })
    }
  }

  handleGetPostById (func, id) {
    func(id).then(resp => {
      if (resp && resp.error && resp.error.length > 0) {
      } else {
      }
    })
  }

  render () {
    const { store } = this.props
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
              {store &&
                store.Posts &&
                store.Posts.map((post, index) => {
                  return (
                    <tr key={index}>
                      <td>{post.id}</td>
                      <td>{post.title}</td>
                      <td>{post.description}</td>
                      <td>
                        <div>
                          <button
                            className='btn btn-warning'
                            onClick={async () => {
                              this.handleDeletePost(post.deletePost, post.title)
                            }}
                          >
                            Delete
                          </button>
                          <button
                            className='btn btn-info'
                            onClick={() => {
                              this.handleGetPostById(
                                store.getPostEditModelById,
                                post.id
                              )
                              store.formIsUpdate(true)
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              {(!store || !store.Posts || store.Posts.length === 0) && (
                <tr>
                  <td className='no-content' colSpan='4'>
                    No Content!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {store && !store.IsUpdate ? (
          <div className='col-4'>
            <PostCreateForm />
          </div>
        ) : null}
        {store && store.IsUpdate && store.PostEditModel ? (
          <div className='col-4'>
            <button
              className='btn btn-success'
              onClick={() => {
                store.formIsUpdate(false)
              }}
            >
              Create
            </button>
            <PostUpdateForm PostEditModel={store.PostEditModel} />
          </div>
        ) : null}
      </div>
    )
  }
}

export default inject('store')(observer(Post))
