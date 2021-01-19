//page navigation

import React from "react"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute" //to prevent unauthorised access of pages
import Signup from "./Signup"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import EditProfile from "./EditProfile"
import ToDoDashboard from "./toDo/toDoDashboard"
import myList from "./toDo/myList"
import Home from './HomePage'
import Noto from './NotoHome'
import Timer from './Timer/Timer'
import TimerReport from './Timer/TimerReport'
import BoardDashBoard from './Board/BoardDashboard'
import Board from './Board/Board'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/timer" component={Timer}/>
          <PrivateRoute path="/to-do-dashboard" component={ToDoDashboard} />
          <PrivateRoute path="/to-do-list" component={myList} />
          <PrivateRoute path="/timer-report" component={TimerReport}/>
          <PrivateRoute path="/board-dashboard" component={BoardDashBoard}/>
          <PrivateRoute path="/board/:key" component={Board} />
          <Route exact path="/" component={Noto} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
