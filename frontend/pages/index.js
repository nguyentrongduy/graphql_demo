import React, { Component } from 'react'
import 'isomorphic-fetch'

import Post from '../src/containers/post/Post'
import { getCookie } from '../src/_helpers/utils'
import { initializeStore } from '../src/models/rootStore'
import { setCookieToken } from '../src/ApolloClient'

export default class App extends Component {
  static async getInitialProps ({ req, res }) {
    // TODO: Fetch posts here
    const isServer = typeof window === 'undefined'
    const store = initializeStore(isServer)
    if (isServer) {
      const token = getCookie(req.headers.cookie, 'token')

      const isOk = await store.checkLoggedIn(token)
      if (isOk) {
        setCookieToken(token)
        try {
          store.getAllPost()
        } catch (e) {
          if (res) {
            res.writeHead(301, {
              Location: '/error'
            })
            res.end()
          }
        }
      } else {
        if (res) {
          res.writeHead(301, {
            Location: '/login'
          })
          res.end()
        }
      }
      store.clearAlert()
    }

    return {}
  }

  render () {
    return <Post />
  }
}
