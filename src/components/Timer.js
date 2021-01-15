import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Button from '@material-ui/core/Button';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Dashboard from './Dashboard'
import "react-awesome-button/dist/styles.css";
import '../timer.css';

/**
 * @summary: This page is the pomodoro timer page. Not related to timer report page.
 * 
 * @description: below i will list all the important functions to be listed inside the report, 
 *               and briefly describe their functions.
 * 
 * @constructor: Timer feature uses setState mostly. There are 5 state variables and 6 functions under this class.
 *               Everytime the 3 buttons are clicked, if will set the state for the variables according to the time of pomodoro.
 *               The setTimeForCode, setTimeForSocial, setTimeForCoffee functions just calls the @function setTime() with their
 *                  pre-set time in seconds.
 * 
 * @function setTime(): this function is in charge of SETTING the countdown. If setTimeForCode/Social/Coffee calls for this function,
 *                      they will pass how long the timer should count down. This function will set state for some variables and call
 *                      @function restartInterval().
 * 
 * @function restartInterval(): this function is in charge of PERFORMING the countdown. The crucial codes are
 *             @code clearInterval(this.interval); //stops the current countdown.
 *             @code this.interval = setInterval(this.elapseTime, 1000); //setInterval is built in function.
 *                                                                       //it will call @function elapseTime() every 1s.
 * 
 * @function elapseTime(): this function is in charge of MINUSING the time. will set state for @var time by minusing 1 until 0;
 */

export default class TimerPage extends React.Component{
    constructor() {
        super();
        this.state = {
          time: 0,
          play: false,
          timeType: 0,
          title: '',
          estimated: false
        };
        // Bind early, avoid function creation on render loop
        this.setTimeForCode = this.setTime.bind(this, 1500);
        this.setTimeForSocial = this.setTime.bind(this, 300);
        this.setTimeForCoffee = this.setTime.bind(this, 900);
        this.reset = this.reset.bind(this);
        this.play = this.play.bind(this);
        this.elapseTime = this.elapseTime.bind(this);
    }

    componentDidMount() {
        this.setDefaultTime();
    }

    elapseTime() {
        if (this.state.time === 0) {
          this.reset(0);
          this.alert();
        }
        if (this.state.play === true) {
          let newState = this.state.time - 1;
          this.setState({time: newState, title: this.getTitle(newState)});
        }
      }

    format(seconds) {
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 3600 % 60);
        let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        return timeFormated;
    }

    getFormatTypes() {
        return [
          {type: "code", time: 1500},
          {type: "social", time: 300},
          {type: "coffee", time: 900}
        ];
    }
    
    formatType(timeType) {
        let timeTypes = this.getFormatTypes();
        for(let i=0; i<timeTypes.length; i++) {
          let timeObj = timeTypes[i];
          if(timeObj.time === timeType) {
            return timeObj.type;
          }
        }
        return null;
    }
    
    restartInterval() {
        clearInterval(this.interval);
        this.interval = setInterval(this.elapseTime, 1000);
    }
    
    play() {
        if (true === this.state.play) return; 
    
        this.restartInterval();
        
        this.setState({ 
          play: true 
        });
    }
    
    reset(resetFor = this.state.time) {
        clearInterval(this.interval);
        let time = this.format(resetFor);
        this.setState({play: false});
    }
    
    togglePlay() {
        if (true === this.state.play)
          return this.reset();
    
        return this.play();
    }
    
    setTime(newTime) {
        this.restartInterval();
        
        this.setState({
          time: newTime, 
          timeType: newTime, 
          title: this.getTitle(newTime), 
          play: true,
          estimated: false
        });
    }
    
    setDefaultTime() {
        let defaultTime = 1500;
    
        this.setState({
          time: defaultTime, 
          timeType: defaultTime, 
          title: this.getTitle(defaultTime), 
          play: false,
          estimated: false
        });
    }
    
    getTitle(time) {
        time = typeof time === 'undefined' ? this.state.time : time;
        let _title = this.format(time) + ' | Pomodoro timer';
        return _title;
    }
    
    _setLocalStorage (item, element) {
        let value = element.target.checked;
        localStorage.setItem('react-pomodoro-' + item, value);
    }
    
    _getLocalStorage (item) {
        return (localStorage.getItem('react-pomodoro-' + item) == 'true') ? true : false;
    }
    
    alert() {
      console.log("hello");
      let audio = new Audio('/song/alarm.mp3');
      console.log(audio);
      audio.play();
      setTimeout(()=> audio.pause(), 1400);
    }

    render(){
        return(
            <div className="container">
                <div>
                    <Dashboard></Dashboard>
                </div>
                <div className="reportButtonContainer">
                    <Button
                        variant="outlined"
                        startIcon={<AssessmentIcon />}
                    >
                        Report
                    </Button>
                </div>
                <div className="timerContainer">
                    <div className="timerMain">
                        <div className="timerControlButton">
                            <AwesomeButton type="secondary" onPress={this.setTimeForCode}>Pomodoro</AwesomeButton>
                            <AwesomeButton type="secondary" onPress={this.setTimeForSocial}>Short Break</AwesomeButton>
                            <AwesomeButton type="secondary" onPress={this.setTimeForCoffee}>Long Break</AwesomeButton>
                        </div>
                        <div className={"timerCountdown"}>
                            <span className="time">{this.format(this.state.time)}</span>
                        </div>
                        <div className={"timerEstimated"}>
                            <h5></h5>
                        </div>
                    </div>
                    <div className={"timerCenter"}>
                        <button className={"startButton"} onClick={this.play}>START</button>
                        <button className={"stopButton"} onClick={this.reset}>STOP</button>
                    </div>
                </div>
            </div>
        );
    }
}