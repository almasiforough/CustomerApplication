import React from 'react'
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import Home from '../Screens/Home'
import User from '../Screens/User'

export default function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/user" exact>
          <User />
        </Route>
        <Route path="/user/:id">
          <User />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}
