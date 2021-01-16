import React from "react"
import Top from './HomePageComponent/top-half'
import Bottom from './HomePageComponent/btm-half'
import Footer from './Footer'
import NotoNavBar from "./NotoNavBar";

export default function NotoHome() {
    return(
        <>
            <NotoNavBar/>
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