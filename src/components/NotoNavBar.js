import React from "react"
import './NavBar.css';
import logo from '../img/logo.png';

function NotoNavBar()
{
    return (
    <div className="nav-container">
            <div className="align-row">
                <div className = "nav-sub1">
                    <img src={logo} alt="Logo"/>
                    <p>Noto</p>
                </div>
                <div className="buttons-register-login">
                    <div className="buttons-register-login-holder">
                        <ul>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/signup">Sign Up</a></li>
                        </ul>
                    </div>
                </div>
            </div>
                
            <div className="navi-bar">
            </div>
    </div>
    )
}

export default NotoNavBar;