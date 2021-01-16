import React from "react"
import '../../home.css'

export default function TopHalf(){

    return(
        <div>
            <div className="home">
               <div className="textBox">
                    <h1 className="h1">Noto - Redefining Productivity</h1>
                    <p className="p">The place for you to manage your tasks<br/> 
                    and collaborate with your teams. <br/>
                    Stay motivated, stay effective with Noto.</p>
               </div>
               
                <div>
                    <img src="/taskmanage.png" alt=""/>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}