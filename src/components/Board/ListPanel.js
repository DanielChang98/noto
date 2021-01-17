import React, { Component } from "react"
import firebase from "firebase/app"
import ListCard from "./ListCard"
import ListCardForm from "./ListCardForm"
import './board.css';

class ListPanel extends Component {

    constructor() {
        super();
        this.state = {
            notes: {},
            // i: 0
        }
    }

    componentDidMount() {
        const myNote = firebase.database().ref("notes/")

        myNote.orderByChild("cardKey").equalTo(this.props.card.key).on("value", snapshot => {
            const myNoteFromDatabase = snapshot.val();
            if (myNoteFromDatabase === null) {
                console.log("Note at our database is null")
            } else {
                this.setState({ notes: snapshot.val() || {} });
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
        var note = JSON.parse(e.dataTransfer.getData("note"));
        note.cardKey = this.props.card.key;
        var key = note.key;
        delete note.key;
        console.log("note.cardKey is what", note.text);
        firebase.database().ref("notes/").update({
            [key]: {
                cardKey: note.cardKey,
                text: note.text
            }
        });
        console.log(this.state.notes);
    }


    render() {

        var notes = Object.keys(this.state.notes).map(key => {
            var note = this.state.notes[key];
            note.key = key;
            return <ListCard
                key={key}
                note={note}
                style={{ position: "absolute", right: "5", top: "0" }}
            // propTypes={{card: React.PropTypes.object.isRequired}}
            />
        });

        // const randomList = ["#CCF3FF", "#E6CDFF", "#C1DEFF", "#E3FFF3", "#FFF3CA", "#FFDACE"]
        // const randomColor = randomList[this.state.i];
        // var temp = this.state.i;
        // temp = (temp + 1) % 6;
        // this.setState({ i: temp });

        return (
            <div
                // style={{ backgroundColor: randomColor }}
                className="card-container-2"
                onDragOver={(e) => this.onDragOver(e)}
                onDragLeave={(e) => this.onDragLeave(e)}
                onDrop={(e) => { this.onDrop(e) }}
            >
                <div className="card-panel-default">
                    <h3 className="card-heading">
                        {this.props.card.name}
                    </h3>
                    <div className="card-body">
                        {notes}
                    </div>
                    <div className="card-footer">
                        <ListCardForm
                            cardKey={this.props.card.key}
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