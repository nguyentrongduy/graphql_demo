import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class PostForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      description: '',
      prevId: null
    }
  }

  componentDidUpdate () {
    this.updateState()
  }

  updateState () {
    const { store } = this.props

    const post = store.PostEditModel
    if (post && post.id && post.id !== this.state.prevId && store.IsUpdate) {
      this.setState({
        id: post.id,
        title: post.title,
        description: post.description,
        prevId: post.id
      })
    }
  }

  handleCreatePost (title, description) {
    const store = this.props.store
    store.createPost(title, description).then(resp => {
      if (resp && resp.error && resp.error.length > 0) {
      } else {
      }
    })
    this.setState({ title: '', description: '' })
  }

  handleUpdatePost (func, title, description) {
    const store = this.props.store
    func(title, description).then(resp => {
      if (resp && resp.error && resp.error.length > 0) {
      } else {
        store.setPostsData(resp.data)
      }
    })
  }

  render () {
    const { title, description } = this.state
    const { store } = this.props
    const post = store.PostEditModel
    return (
      <div className='col-12'>
        {store && store.IsUpdate && store.PostEditModel ? (
          <button
            className='btn btn-success'
            onClick={() => {
              store.formIsUpdate(false)
              this.setState({ title: '', description: '', prevId: null })
            }}
          >
            Create
          </button>
        ) : null}
        {store && store.IsUpdate && store.PostEditModel ? (
          <h2 key={post.id}>Update</h2>
        ) : (
          <h2>Create</h2>
        )}
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            className='form-control'
            value={title}
            onChange={e => this.setState({ title: e.target.value })}
            type='text'
            placeholder='title for the post'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description</label>
          <input
            id='description'
            className='form-control'
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type='text'
            placeholder='description for the post'
          />
        </div>
        <button
          className='btn btn-success'
          onClick={() => {
            if (store.IsUpdate) {
              this.handleUpdatePost(post.updatePost, title, description)
            } else {
              this.handleCreatePost(title, description)
            }
          }}
        >
          {store && store.IsUpdate ? 'Update' : 'Create'}
        </button>
      </div>
    )
  }
}

export default inject('store')(observer(PostForm))
