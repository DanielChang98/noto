import React, { Component, createRef } from 'react';
import '../../home.css'
import timer from '../../img/timer.png';
import kanban from '../../img/kanban.png';
import checklist from '../../img/checklist.png';

class Bottom extends Component {
    register = () => 
	{
		window.location.href = `/${"signup"}`
	}

	constructor(props) {
		super(props);
		this.scrollDiv = createRef();
    }
    
    render(){
        return(
            <>
            <div className="try-buttons">
                <button onClick={this.register} className="secondary-button2">
                    TRY NOW
                </button>
                <button  className="primary-button2" onClick={() => {this.scrollDiv.current.scrollIntoView({ behavior: 'smooth' });}}>
                    LEARN MORE
                </button>
            </div>
            <div className="btmHalfContainer">
                <div className="btmHalfTitle">
                    <h3 className="btmHalfH3">What can you do with Noto?</h3>
                </div>
                <div className="feature-section" ref={this.scrollDiv}>
                    <p id="feature-title" className="feature-title">Features Available</p>
                        <div className="feature-container">
                            <div id="feature1" className="feature">
                                <div className="f-img">
                                    <img src={checklist} alt="screen sharing"/>
                                </div>
                                <div className="f-text">	
                                    <p>Task Management</p>
                                </div>
                                    <div class="content-overlay1"></div>
                                    <div class="content-details1">
                                        <p>To do list feature is here to help the users to manage tasks efficiently.</p>
                                    </div>
                                </div>
                                <div id="feature2" className="feature">
                                    <div className="f-img2">
                                        <img src={kanban} alt="speech analytics"/>
                                    </div>
                                    <div className="f-text">	
                                        <p>Team Collaboration</p>
                                    </div>
                                    <div class="content-overlay2"></div>
                                    <div class="content-details2">
                                        <p>Kanban board is here to help the users manage their team project effectively.</p>
                                    </div>
                                </div>
                                <div id="feature3" className="feature">
                                    <div className="f-img">
                                        <img src={timer} alt="live chat"/>
                                    </div>
                                    <div className="f-text">	
                                        <p>Stay Motivated</p>
                                    </div>
                                    <div class="content-overlay3"></div>
                                    <div class="content-details3">
                                        <p>Pomodoro timer is here to help the user to stay productive in completing their tasks.</p>
                                    </div>
                                </div>
                            </div>
                        </div>	
            </div>
            </>
        )
    }
}

export default Bottom;