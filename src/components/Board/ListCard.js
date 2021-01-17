import React, { Component } from "react"
import firebase from "firebase/app"
import './board.css';

class ListCard extends Component {

    constructor (){
        super();
        this.state = {
            cards: {},
        }
    }

    componentDidMount () {
        this.cardsRef = firebase.database().ref("cards/")
    }

    handleDeleteCard = key => {
        firebase.database().ref(`cards/${key}`).remove();
        console.log("Successful delete card!");
        console.log(this.state.cards);
    }

    handleOnDragStart = e => {
        e.dataTransfer.setData('card', JSON.stringify(this.props.card));
    }

    render () {
        return (
            <div className="card" draggable="true" onDragStart={this.handleOnDragStart}>
                <p>{this.props.card.text}</p>
                <div style={this.style}>
                    <button 
                        className="delete-card" 
                        onClick={() => {
                            this.handleDeleteCard(this.props.card.key);
                        }}
                    >x</button>
                </div>
            </div>
        );
    }
}

export default ListCard;