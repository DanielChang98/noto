//dashboard page after user signs in
//line 16 to 18 is where you add pathname as written in app.js (add after path: "/)

import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { IconButton, AppBar, Toolbar, List, ListItem, ListItemText } from "@material-ui/core"
import { ExitToApp } from "@material-ui/icons"
import { useHistory } from "react-router-dom"

export default function Dashboard() {
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const navLinks = [
    { title: "Dashboard", path: "/" },
    { title: "Tasks", path: "/" },
    { title: "Board", path: "/" },
    { title: "Timer", path: "/" },
    { title: "Account", path: "/edit-profile" }
  ]

  //function to handle logout
  async function handleLogout() {
    try {
      await logout()
      history.push("/login")   //navigate to login page
    } catch {
      console.log("Failed to log out")
    }
  }

  return (
    <>
      <AppBar id="navbar" >
        <Toolbar id="navflex">
          Noto
          <List id="navlink">
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title}>
                <ListItem>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
          <List>
            <ListItem>
              <IconButton color="inherit"  onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </>
  )
}
