import React, { Component, useState } from "react"
import firebase from "firebase/app"
import BoardCard from "./BoardCard"
import BoardForm from "./BoardForm"
import NavBar from "../NavBar";
import Footer from "../Footer";
import './board.css';


class BoardDashboard extends Component{

  constructor() {
    super();
    this.state = {
      boards: {}
    }
  }

  componentDidMount() {
    const userID = sessionStorage.getItem("userID");
    const myBoard = firebase.database().ref("boards/"+userID);
    myBoard.on("value", snapshot => {
        this.setState({boards: snapshot.val() || {}});
      });
    }

  render(){
    // var cards = Object.keys(this.state.boards).map(function(key) {
      var cards = Object.keys(this.state.boards).map(key => {
        var board = this.state.boards[key];
        board.key = key;
        return <BoardCard key = {key} board = {board} />
      });
    // }.bind(this));
      
    return(
      <>
      <NavBar/>
      <div className = "kanbanboard-container">
        <div className = "kanbanboard">
          <h2 className = "myboardtitle">
            MY BOARD
          </h2>
          <div>
            {cards}
          </div>
          <div className = "boardform-container">
            <BoardForm/>
          </div>
        </div>
      </div>
      
      <Footer/>
      </>
    );
  }
}

export default BoardDashboard;