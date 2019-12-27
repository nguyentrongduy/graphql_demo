import React, { Component } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { createBrowserHistory } from 'history'

import Post from './post/Post'
import Login from './login/login'
import Register from './register/register'
import { PrivateRoute } from '../components/private/private'
import './App.css'

const history = createBrowserHistory()

class App extends Component {
  constructor (props) {
    super(props)
    const { store } = this.props
    store.checkLoggedIn()
  }

  handleLogout () {
    history.push('/login')
  }

  render () {
    const { store } = this.props
    const { AlertState } = store
    return (
      <Router history={history}>
        <div className='App container-fluid'>
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
            <div className={`alert ${AlertState.type}`}>
              {AlertState.message}
            </div>
          )}
          <div className='body-content'>
            <Switch>
              <PrivateRoute exact path='/' component={Post} store={store} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Redirect from='*' to='/' />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default inject('store')(observer(App))
