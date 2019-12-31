import React from 'react'
import App from 'next/app'
import { getSnapshot } from 'mobx-state-tree'
import { Provider } from 'mobx-react'
import Head from 'next/head'
import Router from 'next/router'

import { initializeStore } from '../src/models/rootStore'

export default class CustomApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const isServer = typeof window === 'undefined'
    const store = initializeStore(isServer)

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    }
  }

  constructor (props) {
    super(props)
    this.store = initializeStore(props.isServer, props.initialState)
  }

  componentDidMount () {
    if (process.browser) {
      if (
        this.props &&
        this.props.router &&
        this.props.router.route !== '/login'
      ) {
        this.store.checkLoggedIn().then(resp => {
          if (!resp) {
            Router.push('/login')
          }
        })
      }
    }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Provider store={this.store}>
        <Head>
          <link
            rel='stylesheet'
            href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
          />
        </Head>
        <div className='App container-fluid'>
          <Component {...pageProps} />
        </div>
      </Provider>
    )
  }
}
