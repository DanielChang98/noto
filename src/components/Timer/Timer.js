import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Button from '@material-ui/core/Button';
import ProgressBar from 'react-bootstrap/ProgressBar'
import AssessmentIcon from '@material-ui/icons/Assessment';
import NavBar from "../NavBar";
import Footer from "../Footer";
import "react-awesome-button/dist/styles.css";
import './timer.css';

export default class TimerPage extends React.Component{
    constructor() {
        super();
        this.state = {
          time: 0,
          play: false,
          timeType: 0,
          title: '',
          estimated: false,
          backgroundColor: '',
          progress: 0,
          button: '',
          type: ''
        };
        // Bind early, avoid function creation on render loop
        this.setTimeForCode = this.setTimeForCode.bind(this);
        this.setTimeForSocial = this.setTimeForSocial.bind(this);
        this.setTimeForCoffee = this.setTimeForCoffee.bind(this);
        this.onClick = this.onClick.bind(this);
        this.reset = this.reset.bind(this);
        this.play = this.play.bind(this);
        this.elapseTime = this.elapseTime.bind(this);
    }

    componentDidMount() {
        this.setDefaultTime();
        Notification.requestPermission();
    }

    elapseTime() {
        if (this.state.time === 0) {
          this.reset(0);
          this.alert();
        }
        if (this.state.play === true) {
          let newState = this.state.time - 1;
          this.setState({time: newState, title: this.getTitle(newState)});
          this.progress();
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

    onClick() {
        let audio = new Audio('/song/button.mp3');
        audio.play();

        if( false === this.state.play){
            this.play();
        }
        else{
            this.reset();
        }
    }
    
    play() {
        if (true === this.state.play) return; 
    
        this.restartInterval();
        
        this.setState({ 
          play: true 
        });
    }

    progress() {
        let percentage = ((this.state.timeType-this.state.time)/this.state.timeType)*100;
        console.log(percentage);
        this.setState({progress: percentage});
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

    setTimeForCode(){
        this.setState({
            backgroundColor: 'rgb(240, 91, 86)',
            type: 'Work',
            play: false
        });

        this.setTime(1500);
    }

    setTimeForSocial(){
        this.setState({
            backgroundColor: 'rgb(76, 166, 169)',
            type: 'Social',
            play: false
        });

        this.setTime(300)
    }

    setTimeForCoffee(){
        this.setState({
            backgroundColor: 'rgb(73, 143, 193)',
            type: 'Coffee',
            play: false,
        });

        this.setTime(900)
    }
    
    setTime(newTime) {
        this.restartInterval();
        
        this.setState({
          time: newTime, 
          timeType: newTime, 
          title: this.getTitle(newTime), 
          estimated: false,
        });
    }
    
    setDefaultTime() {
        let defaultTime = 1500;
    
        this.setState({
          time: defaultTime, 
          timeType: defaultTime, 
          title: this.getTitle(defaultTime), 
          play: false,
          estimated: false,
          type: 'Work'
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
      audio.play();
      setTimeout(()=> audio.pause(), 1400);
    }

    render(){
        const {backgroundColor} = this.state;
        return(
            <>
            <NavBar/>
            <div className="container-timer" style={{backgroundColor: backgroundColor}}>
                <div className="reportButtonContainer">
                    <a href="/timer-report">
                        <Button
                            variant="outlined"
                            startIcon={<AssessmentIcon />}>
                            Report
                        </Button>
                    </a>
                </div>
                <div className="timerContainer">
                    <div>
                        <div className="timerMain">
                            <div className="timerControlButton">
                                <AwesomeButton type="secondary" onPress={this.setTimeForCode}>Pomodoro</AwesomeButton>
                                <AwesomeButton type="secondary" onPress={this.setTimeForSocial}>Short Break</AwesomeButton>
                                <AwesomeButton type="secondary" onPress={this.setTimeForCoffee}>Long Break</AwesomeButton>
                            </div>
                            <div className={"timerCountdown"}>
                                <span className="time">{this.format(this.state.time)}</span>
                            </div>
                            <div className="time-desc-container">
                                <p className="start-work">Time for {this.state.type}!</p>
                            </div>
                            <div>
                                <ProgressBar now={this.state.progress}/>
                            </div>
                        </div>
                    </div>
                    <div className={"timerCenter"}>
                        <button className={"startButton"} style={{color: backgroundColor}} onClick={this.onClick}>{(this.state.play?'STOP':'START')}</button>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        );
    }
}