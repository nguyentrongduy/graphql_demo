import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class PostUpdateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      description: '',
      prevId: null
    }
    this.store = this.props
  }

  componentDidMount () {
    this.updateState()
  }

  componentDidUpdate () {
    this.updateState()
  }

  updateState () {
    const post = this.props.PostEditModel
    if (post && post.id && post.id !== this.state.prevId) {
      this.setState({
        id: post.id,
        title: post.title,
        description: post.description,
        prevId: post.id
      })
    }
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
    const post = this.props.PostEditModel
    return (
      <div className='col-xs-12'>
        <h2 className={post.id}>Update {post.title}</h2>
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
            this.handleUpdatePost(post.updatePost, title, description)
          }}
        >
          Update
        </button>
      </div>
    )
  }
}

export default inject('store')(observer(PostUpdateForm))
