import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import Button from '@material-ui/core/Button';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Dashboard from './Dashboard'
import "react-awesome-button/dist/styles.css";
import '../timer.css';

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
    
    
    toggleMode(gotoDirection) {
        let timeTypes = this.getFormatTypes();
        let currentPosition = -1;
    
    
        for (let i = 0; i < timeTypes.length; i++) {
          if (timeTypes[i].time === this.state.timeType) {
            currentPosition = i;
            break;
          };
        };
    
        if (currentPosition !== -1) {
          let newMode = timeTypes[currentPosition + gotoDirection];
          if (newMode) this.setTime(newMode.time);
        };
    }
    
    _setLocalStorage (item, element) {
        let value = element.target.checked;
        localStorage.setItem('react-pomodoro-' + item, value);
    }
    
    _getLocalStorage (item) {
        return (localStorage.getItem('react-pomodoro-' + item) == 'true') ? true : false;
    }
    
    alert() {
        // vibration
        if(this.refs.vibrate.checked) {
          window.navigator.vibrate(1000);
        }
        // audio
        if(this.refs.audio.checked) {
          let audio = new Audio('songs/alarm.mp3');
          audio.play();
          setTimeout(()=> audio.pause(), 1400);
        }
        // notification
        if(this.refs.notification.checked) {
          if (this.state.timeType === 1500) {
            let notification = new Notification("Relax :)", {
              icon: "img/coffee.png",
              lang: "en",
              body: "Go talk or drink a coffee."
            });
          } else {
            let notification = new Notification("The time is over!", {
              icon: "img/code.png",
              lang: "en",
              body: "Hey, back to code!"
            });
          }
        }
    }

    estimatedTime(){
        // var type = this.getTimerType();
        var time;

        var today = new Date();
        var minutes;

        // if(1500===type){
        //     minutes=25;
        // }
        // else if(300===type){
        //     minutes=5;
        // }
        // else{
        //     minutes=15;
        // }

        // let twentyMinutesLater = new Date(today.getTime() + (minutes*60*1000))
        // console.log(twentyMinutesLater);
 
        // time = twentyMinutesLater.getHours()+":";

        // if(twentyMinutesLater.getMinutes()<10){
        //     time = time + "0" + twentyMinutesLater.getMinutes();
        // }
        // else{
        //     time = time + twentyMinutesLater.getMinutes();
        // }

        console.log("hi")

        // return time;
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