import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postActions } from '../../_actions/post.actions'

class PostUpdateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      description: '',
      prevId: null
    }
  }

  componentDidMount () {
    this.updateState()
  }

  componentDidUpdate () {
    this.updateState()
  }

  updateState () {
    const post = this.props.post.data
    if (post && post.id && post.id !== this.state.prevId) {
      this.setState({
        id: post.id,
        title: post.title,
        description: post.description,
        prevId: post.id
      })
    }
  }

  handleUpdatePost (id, title, description) {
    this.props.updatePost(id, title, description)
  }

  render () {
    const { id, title, description } = this.state
    return (
      <div className='col-xs-12'>
        <h2>Update</h2>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            id='title'
            className='form-control'
            value={this.state.title}
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
            value={this.state.description}
            onChange={e => this.setState({ description: e.target.value })}
            type='text'
            placeholder='description for the post'
          />
        </div>

        <button
          className='btn btn-success'
          onClick={() => {
            this.handleUpdatePost(id, title, description)
          }}
        >
          Update
        </button>
      </div>
    )
  }
}

function mapState (state) {
  const { post } = state.post
  return { post }
}

const actionCreators = {
  updatePost: postActions.updatePost
}

const connectedPostUpdateFormPage = connect(
  mapState,
  actionCreators
)(PostUpdateForm)
export { connectedPostUpdateFormPage as PostUpdateForm }
