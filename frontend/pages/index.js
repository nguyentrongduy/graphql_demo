import React, { Component } from 'react'
import 'isomorphic-fetch'

import Post from '../src/containers/post/Post'

export default class App extends Component {
  static async getInitialProps (props) {
    return {}
  }

  render () {
    return <Post />
  }
}
