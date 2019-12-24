import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postActions } from '../../_actions/post.actions'

class PostCreateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }

  handleCreatePost (title, description) {
    this.props.createPost(title, description)
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

function mapState () {
  return {}
}

const actionCreators = {
  getAllPost: postActions.getAllPost,
  createPost: postActions.createPost
}

const connectedPostCreateFormPage = connect(
  mapState,
  actionCreators
)(PostCreateForm)
export { connectedPostCreateFormPage as PostCreateForm }
