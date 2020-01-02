import React, { Component } from 'react'

import Login from '../src/containers/login/login'

import { initializeStore } from '../src/models/rootStore'

class LoginApp extends Component {
  static async getInitialProps (props) {
    const isServer = typeof window === 'undefined'
    const store = initializeStore(isServer)
    if (isServer) {
      store.logout()
    }
    return {}
  }

  render () {
    return <Login />
  }
}

export default LoginApp
