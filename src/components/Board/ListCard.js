import React, { Component } from "react"
import firebase from "firebase/app"
import ListPanel from "./ListPanel"
import './board.css';

class ListCard extends Component {

    constructor (){
        super();
        this.state = {
            notes: {},
        }
    }

    componentDidMount () {
        this.notesRef = firebase.database().ref("notes/")
    }

    handleDeleteNote = key => {
        firebase.database().ref(`notes/${key}`).remove();
        console.log("Successful delete note!");
        console.log(this.state.notes);
    }

    handleOnDragStart = e => {
        e.dataTransfer.setData('note', JSON.stringify(this.props.note));
    }

    render () {
        return (
            <div className="note" draggable="true" onDragStart={this.handleOnDragStart}>
                <p>{this.props.note.text}</p>
                <div style={this.style}>
                    <button 
                        className="delete-note" 
                        onClick={() => {
                            this.handleDeleteNote(this.props.note.key);
                        }}
                    >x</button>
                </div>
            </div>
        );
    }
}

export default ListCard;