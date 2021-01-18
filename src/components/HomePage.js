<<<<<<< HEAD
//page after user logs in

import React from "react"
import firebase from "firebase/app";
import Top from './HomePageComponent/top-half'
import NavBar from './NavBar'
import Footer from './Footer'

export default function HomePage() {
//get the current user id
const userID = firebase.auth().currentUser.uid
sessionStorage.setItem("userID", userID)
    return(
        <>
            <NavBar/>

            <div>
                <Top></Top>
            </div>
            <Footer/>
        </>
    );
=======
//page after user logs in

import React from "react"
import firebase from "firebase/app";
import Top from './HomePageComponent/top-half'
import NavBar from './NavBar'
import Footer from './Footer'

export default function HomePage() {
//get the current user id
const userID = firebase.auth().currentUser.uid
sessionStorage.setItem("userID", userID)
    return(
        <>
            <NavBar/>

            <div className="home-page-container">
                <Top></Top>
            </div>

            <Footer/>
        </>
    );
>>>>>>> e88a7b6b0b2a4b891f123cb44a9dc18619ce0915
}