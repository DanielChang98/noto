import React from "react"

export default class TimerReport extends React.Component{
    constructor() {
        super();
        this.state = {
            userData: []
        };
    }

    componentDidMount(){
        db.ref("noto-13/userTimerReport").on("values", snapshot => {
            let data = [];
            snapshot.forEach(snap=>{
                data.push(snap.val());
            });
            this.setState({userData: data});
        })
    }

    render(){
        return (
            this.state.userData.map(prop => {
                <div>
                    <h1>{prop.daysAccessed}</h1>
                    <h1>{prop.daysStreak}</h1>
                    <h1>{prop.hoursAccessed}</h1>
                </div>
            })
        );
    }
}