//overall settings for page navigation

import React from "react"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute" //to prevent unauthorised access of pages
import Signup from "./Signup"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import Dashboard from "./Dashboard"
import EditProfile from "./EditProfile"
import Timer from './Timer'

//1.import page function from .js file to section above ^^^ 1 line = 1 page
//2.create new privateroute path (means can access after login only)
// pathname can be any
// component = js function name (best if function name = .js file name to avoid confusion)

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/timer" component={Timer}/>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
