import React from "react"
import { useAuth } from "../contexts/AuthContext"
import { ExitToApp } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import './NavBar.css';
import logo from '../img/logo.png';

function NavBar()
{
    const { logout } = useAuth()
    const history = useHistory()
    
    //function to handle logout
    async function handleLogout() {
        try {
          await logout()
          history.push("/")   //navigate to noto page
        } catch {
          console.log("Failed to log out")
        }
    }

    return (
    <div className="nav-container">
            <div className="align-row">
                <div className = "nav-sub1">
                    <img src={logo} alt="Logo"/>
                    <p>Noto</p>
                </div>
                <div className="buttons-navbar">
                    <div className="buttons-navbar-holder">
                        <ul>
                            <li><a href="/home">Dashboard</a></li>
                            <li><a href="/to-do-dashboard">Tasks</a></li>
                            <li><a href="/board-dashboard">Board</a></li>
                            <li><a href="/timer">Timer</a></li>
                            <li><a href="/edit-profile">Account</a></li>
                            <li>
                                <a>
                                <IconButton color="inherit"  onClick={handleLogout}>
                                <ExitToApp style={{ fontSize: 30 }}/>
                                </IconButton>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
                
            <div className="navi-bar">
            </div>
    </div>
    )
}

export default NavBar;