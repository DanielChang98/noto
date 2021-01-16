import React, { Component } from "react"
import firebase from "firebase/app"
import ListPanel from "./ListPanel"
import ListForm from "./ListForm"
import NavBar from "../NavBar";
import Footer from "../Footer";
import {IconButton} from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import './board.css';

class Board extends Component {

    constructor() {
        super();
        this.state = {
            lists: {},
            inputModeListKey: null
        }
      }
    
    componentDidMount () {
        console.log("Inside Board");
        console.log("this.prop", this.props.match.params.key);
        const myList = firebase.database().ref("lists/");
        myList.orderByChild("boardKey").equalTo(this.props.match.params.key).on("value", snapshot => {
            const myListFromDatabase = snapshot.val();
            if (myListFromDatabase === null) {
                console.log ("List at our database is null");  
            } else {
                this.setState({lists: snapshot.val() || {}}); 
            }
        });
    }

    toggleIsInputMode = (key) => {
        console.log('toggleIsInputMode', key)
        this.setState({inputModeListKey: key});   
    }
    
    testkey = (key) => {
        console.log ("Key", key);
    }

    render () {
        var lists = Object.keys(this.state.lists).map(key => {
            var isInputMode = (this.state.inputModeListKey === key) ? true : false;           
            var list = this.state.lists[key];
            list.key = key;
            return <ListPanel 
                    key={key} 
                    list={list} 
                    isInputMode={isInputMode} 
                    toggleIsInputMode={(key) => this.toggleIsInputMode(key)}/>
        });

        return (
            <>
            <NavBar/>
            <div className="list-container">
                <div className = "sidebar-btn">
                    <IconButton>
                        <DehazeIcon/>
                    </IconButton>
                </div>
                <div className = "cards-arrangement">
                    {lists}
                </div>
                
                <ListForm boardKey={this.props.match.params.key} />
            </div>
            <Footer/>
            </>
        );
    }
}

export default Board;