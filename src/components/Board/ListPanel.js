import React, { Component } from "react"
import firebase from "firebase/app"
import ListCard from "./ListCard"
import ListCardForm from "./ListCardForm"
import './board.css';

class ListPanel extends Component {

    constructor() {
        super();
        this.state = {
            cards: {},
        }
      }

    componentDidMount () {
        const myCard = firebase.database().ref("cards/")
  
        myCard.orderByChild("listKey").equalTo(this.props.list.key).on("value", snapshot => {
            const myCardFromDatabase = snapshot.val();
            if (myCardFromDatabase === null) {
                console.log ("Card at our database is null")
            } else {
                this.setState({cards: snapshot.val() || {}});
            }
            }); 
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDragLeave = (e) => {
        e.preventDefault();
    }

    onDrop = (e) => {
        e.preventDefault();
        var card = JSON.parse(e.dataTransfer.getData("card"));
        card.listKey = this.props.list.key;
        var key = card.key;
        delete card.key;
        console.log("card.listKey is what", card.text);
        firebase.database().ref("cards/").update({
            [key]: {
                listKey: card.listKey,
                text: card.text
            }
        });
        console.log(this.state.cards);
    }

    render() {

        var cards = Object.keys(this.state.cards).map(key => {
            var card = this.state.cards[key];
            card.key = key;
            return <ListCard 
                    key={key} 
                    card={card} 
                    style={{position: "absolute", right: "5", top: "0"}}
                    // propTypes={{card: React.PropTypes.object.isRequired}}
                    />
        });  

        return (
            <div 
                className="list-container-2" 
                onDragOver={(e) => this.onDragOver(e)} 
                onDragLeave={(e) => this.onDragLeave(e)} 
                onDrop={(e) => {this.onDrop(e)}}
            >
                <div className="list-panel-default">
                    <h3 className="list-heading">
                        {this.props.list.name}
                    </h3>            
                    <div className="list-body">
                        {cards}
                    </div>
                    <div className="list-footer">
                        <ListCardForm 
                            listKey={this.props.list.key} 
                            isInputMode={this.props.isInputMode} 
                            toggleIsInputMode={this.props.toggleIsInputMode} 
                        />
                    </div>                            
                </div>
            </div>
        );
    }
}

export default ListPanel;