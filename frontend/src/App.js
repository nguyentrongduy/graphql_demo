import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Post } from './components/post/Post';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { PrivateRoute } from './components/private/private';
import { alertActions } from './_actions/alert.actions';
import { userActions } from './_actions/user.actions';
import './App.css'

const history = createBrowserHistory();

class App extends Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    handleLogout() {
        history.push('/login')
    }

    render() {
        const { alert, loggedIn } = this.props;
        console.log(this.props)
        return (
            <Router history={history}>
                <div className='App container-fluid'>
                    {
                        loggedIn && <button className='btn btn-warning' onClick={() => {
                            this.handleLogout()
                        }}>Logout</button>
                    }
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <div className='body-content'>
                        <Switch>
                            <PrivateRoute exact path='/' component={Post} />
                            <Route path='/login' component={Login} />
                            <Route path='/register' component={Register} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

function mapState(state) {
    const { alert, authentication } = state;
    return { alert, loggedIn: authentication.loggedIn };
}

const actionCreators = {
    clearAlerts: alertActions.clear,
    logoutAction: userActions.logout
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
