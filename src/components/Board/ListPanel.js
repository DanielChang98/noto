import React, { Component } from "react"
import firebase from "firebase/app"
import ListCard from "./ListCard"
import ListCardForm from "./ListCardForm"
import './board.css';
import { Button, Menu, MenuItem, Dialog, DialogContent, DialogActions, TextField} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';

class ListPanel extends Component {

    constructor() {
        super();
        this.state = {
            notes: {},
            anchorEl: null,
            dialogOpen: false,
            updateCard: "",
            cardBoardKey: null,
        }
    }

    componentDidMount() {
        const myNote = firebase.database().ref("notes/")
        myNote.orderByChild("cardKey").equalTo(this.props.card.key).on("value", snapshot => {
                this.setState({ notes: snapshot.val() || {} });
        });
    }

    onDragOver = (e) => {
        e.preventDefault();
    }

    onDragLeave = (e) => {
        e.preventDefault();
        console.log(e.currenTarget);
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

    handleClose = () => {
        this.setState({anchorEl:null});
    }

    removeCard = (thecardKey, mynotes) => {
        for (let i = 0; i < mynotes.length; i++){
            this.removeNote(mynotes[i].key);
        }
        firebase.database().ref(`cards/${thecardKey}`).remove();
        console.log("Success delete card!")
    }

    removeNote = (key) => {
        firebase.database().ref(`notes/${key}`).remove();
    }

    openUpdateDialog = (theCard) => {
        this.setState({
            anchorEl: null,
            dialogOpen: true,
            updateCard: theCard.name,
            cardBoardKey: theCard.boardKey,
        });
    }

    editCard = (theCard) => {
        firebase.database().ref("cards/"+theCard.key).update({
            name: this.state.updateCard,
            boardKey: theCard.boardKey,
        });
        this.setState({dialogOpen: false});
    }

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
        });
    }


    render() {

        var notes = Object.keys(this.state.notes).map(key => {
            var note = this.state.notes[key];
            note.key = key;
            return <ListCard
                key={key}
                note={note}
                propTypes={{card: PropTypes.object.isRequired}}
            />
        });
        
        return (
            <div
                className="card-container-2"
                onDragOver={(e) => this.onDragOver(e)}
                onDragLeave={(e) => this.onDragLeave(e)}
                onDrop={(e) => { this.onDrop(e) }}
            >
                <div className="card-panel-default">
                    <div className="card-heading">
                        <h3 className="card-name">
                            {this.props.card.name}
                        </h3>
                        <Button
                            sizeSmall
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick = {(e) => this.setState({anchorEl: e.currentTarget})}
                        >
                            <MoreVertIcon className = "cardMenu"/>
                        </Button>
                    </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem
                                onClick = {() => {this.openUpdateDialog(this.props.card)}}
                                >Edit</MenuItem>
                            <MenuItem 
                                color="red"
                                onClick = {(thecardKey, mynotes) => this.removeCard(this.props.card.key, notes)}
                                >Delete</MenuItem>
                        </Menu>
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
                <Dialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="normal"
                            label="Edit Card Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            name="updateNote"
                            defaultValue={this.state.updateCard}
                            onChange={e => this.setState({updateCard: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editCard(this.props.card)} color="primary">
                            Save
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ListPanel;