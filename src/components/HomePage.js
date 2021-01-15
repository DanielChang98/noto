import React from "react"
import Home from './HomePageComponent/top-half'
import Top from './HomePageComponent/top-half'
import Bottom from './HomePageComponent/btm-half'
import Dashboard from './Dashboard'

export default function HomePage() {

    return(
        <>
            <Dashboard></Dashboard>
            <div>
                <Top></Top>
            </div>
            <div>
                <Bottom></Bottom>
            </div>
        </>
    );
}