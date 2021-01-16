import React from "react"
import Top from './HomePageComponent/top-half'
import Bottom from './HomePageComponent/btm-half'
import Footer from './Footer'

import { Link } from "react-router-dom"

export default function NotoHome() {
    return(
        <>
         <Link to="/login">Log In</Link><br />
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