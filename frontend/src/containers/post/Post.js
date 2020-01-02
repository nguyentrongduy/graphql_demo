import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import PostForm from '../post-form/PostForm'
import Head from '../head/head'

class Post extends Component {
  constructor (props) {
    super(props)
    this.props.store.getAllPost()
  }

  componentDidMount () {
    const { store } = this.props
    if (process.browser) {
      store.checkLoggedIn()
      store.clearAlert()
    }
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
        <Head />
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
        <div className='col-4'>
          <PostForm />
        </div>
      </div>
    )
  }
}

export default inject('store')(observer(Post))
