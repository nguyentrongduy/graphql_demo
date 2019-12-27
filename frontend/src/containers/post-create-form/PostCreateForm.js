import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

class PostCreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: ''
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

  render () {
    const { title, description } = this.state
    return (
      <div className='col-12'>
        <h2>Create</h2>
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
            this.handleCreatePost(title, description)
          }}
        >
          Create
        </button>
      </div>
    )
  }
}

export default inject('store')(observer(PostCreateForm))
