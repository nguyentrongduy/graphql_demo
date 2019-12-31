import React, { Component } from 'react'
import Link from 'next/link'
import { observer, inject } from 'mobx-react'

import { debounce } from '../../_helpers/utils'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        address: ''
      },
      submitted: false
    }

    const { store } = this.props

    this._debounceExistUser = debounce(username => {
      store.userExist(username)
    }, 300)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const { name, value } = event.target
    const { user } = this.state
    if (name === 'username') {
      this._debounceExistUser(value)
    }
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const { store } = this.props
    this.setState({ submitted: true })
    const { user } = this.state
    if (
      user.username &&
      user.password &&
      user.firstName &&
      user.lastName &&
      user.address &&
      !store.RegisterUserExist
    ) {
      store.register(user)
    }
  }

  render () {
    const { registering, store } = this.props
    const { user, submitted } = this.state
    return (
      <div className='col-md-6 col-md-offset-3'>
        <h2>Register</h2>
        <form name='form' onSubmit={this.handleSubmit}>
          <div
            className={
              'form-group' + (submitted && !user.username ? ' has-error' : '')
            }
          >
            <label htmlFor='username'>Username</label>
            {store && store.RegisterUserExist && (
              <div className='help-block required'>Username is exist</div>
            )}
            <input
              type='text'
              className='form-control'
              name='username'
              value={user.username}
              onChange={this.handleChange}
            />
            {submitted && !user.username && (
              <div className='help-block required'>Username is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.password ? ' has-error' : '')
            }
          >
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={user.password}
              onChange={this.handleChange}
            />
            {submitted && !user.password && (
              <div className='help-block required'>Password is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.firstName ? ' has-error' : '')
            }
          >
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              className='form-control'
              name='firstName'
              value={user.firstName}
              onChange={this.handleChange}
            />
            {submitted && !user.firstName && (
              <div className='help-block required'>First Name is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.lastName ? ' has-error' : '')
            }
          >
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              className='form-control'
              name='lastName'
              value={user.lastName}
              onChange={this.handleChange}
            />
            {submitted && !user.lastName && (
              <div className='help-block required'>Last Name is required</div>
            )}
          </div>
          <div
            className={
              'form-group' + (submitted && !user.address ? ' has-error' : '')
            }
          >
            <label htmlFor='address'>Address</label>
            <input
              type='text'
              className='form-control'
              name='address'
              value={user.address}
              onChange={this.handleChange}
            />
            {submitted && !user.address && (
              <div className='help-block required'>Address is required</div>
            )}
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
            {registering && (
              <img
                alt='Register'
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
              />
            )}
            <Link href='/login'>
              <a className='btn btn-link'>Cancel</a>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}

export default inject('store')(observer(Register))
