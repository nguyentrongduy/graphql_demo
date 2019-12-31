import { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Router from 'next/router'

class Head extends Component {
  handleLogout () {
    Router.push('/login')
  }

  render () {
    const { store } = this.props
    const { AlertState } = store
    return (
      <div className='head col-12'>
        {store && store.LoggedIn && (
          <button
            className='btn btn-warning'
            onClick={() => {
              this.handleLogout()
            }}
          >
            Logout
          </button>
        )}
        {AlertState && AlertState.message && AlertState.type && (
          <div className={`alert ${AlertState.type}`}>{AlertState.message}</div>
        )}
      </div>
    )
  }
}

export default inject('store')(observer(Head))
