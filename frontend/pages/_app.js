import React from 'react'
import App from 'next/app'
import { getSnapshot } from 'mobx-state-tree'
import { Provider } from 'mobx-react'
import Head from 'next/head'

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
