import React, { Component } from 'react'

import Login from '../src/containers/login/login'

class LoginApp extends Component {
  static async getInitialProps (props) {
    return {}
  }

  render () {
    return <Login />
  }
}

export default LoginApp
