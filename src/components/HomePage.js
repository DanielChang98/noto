import React from "react"
import firebase from "firebase/app";
import Top from './HomePageComponent/top-half'
import Bottom from './HomePageComponent/btm-half'
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
            <div>
                <Bottom></Bottom>
            </div>
            <Footer/>
        </>
    );
}