import React from "react"
import ReportComponent from './ReportComponent'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import firebase from "../firebase"
import { VictoryBar, VictoryChart, VictoryAxis  } from 'victory';

import '../report.css'

var info = [];

const trying = [
    {
        date: 0,
        hour: 1500
    },
    {
        date: 1,
        hour: 1500
    },
    {
        date: 3,
        hour: 1500
    }
]

const fakeData = {
    x: 10.0,
    y: 1500
}

export default class TimerReport extends React.Component{
    constructor() {
        super();
        this.state = {
            hoursFocused: 0,
            daysAccessed: 0,
            daysStreak: 0,
            infoArray: [] //for graph
        };
    }

    componentDidMount(){
        const myList = firebase.database().ref("userTimerReport/");
        const user = firebase.auth().currentUser;

        myList.on('value', snapshot => {
            snapshot.forEach(snap=>{
                if(snap.key===user.uid){
                   let object = snap.val();
                   this.setState({
                       hoursFocused: object.hoursFocused,
                       daysAccessed: object.daysAccessed,
                       daysStreak: object.daysStreak
                   })
                }
            });
        })

        const myHours = firebase.database().ref("hours/");
        myHours.on('value', snapshot => {
            snapshot.forEach(snap=>{
                if(snap.key===user.uid){
                    snap.forEach(values=>{
                        // let obj = values.val();
                        // let container = {};
                        // container["x"] = obj.date;
                        // container["y"] = obj.hour;
                        // console.log(values.val())
                        // this.state.infoArray.push(container);
                    })
                }
            });
        })
        this.state.infoArray.push(fakeData);
    }

    render(){
        return (
            <div>
                <div className="bar">
                    <div className="barInnerContainer">
                        <ReportComponent icon="AccessTimeIcon" label={this.state.hoursFocused} bottomLabel="hours focused"></ReportComponent>
                        <ReportComponent icon="DateRangeIcon" label={this.state.daysAccessed} bottomLabel="days accessed"></ReportComponent>
                        <ReportComponent icon="WhatshotIcon" label={this.state.daysStreak} bottomLabel="days streak"></ReportComponent>
                    </div>
                </div>
                <div className="focusHourBar">
                    <p className="focusHourFont">Focus Hours</p>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button>Today</Button>
                        <Button>This Week</Button>
                    </ButtonGroup>
                </div>
                <div>
                    <VictoryChart>
                    <VictoryAxis tickFormat={(x) => ``} />
                        <VictoryBar
                        data={this.state.infoArray}
                        x="x"
                        y="y"
                        />
                    </VictoryChart>
                </div>
            </div>
        );
    }
}