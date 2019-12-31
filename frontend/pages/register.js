import React, { Component } from 'react'

import Register from '../src/containers/register/register'

class RegisterApp extends Component {
  static async getInitialProps (props) {
    return {}
  }

  render () {
    return <Register />
  }
}

export default RegisterApp
