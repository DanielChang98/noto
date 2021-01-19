import React, { Component } from "react"
import firebase from "firebase/app"
import ListPanel from "./ListPanel"
import ListForm from "./ListForm"
import NavBar from "../NavBar";
import Footer from "../Footer";
import {Button, IconButton, Dialog, DialogContent, DialogActions, TextField, DialogTitle, DialogContentText} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './board.css';

class Board extends Component {

    constructor() {
        super();
        const board = JSON.parse(sessionStorage.getItem("board"))
        this.state = {
            cards: {},
            notes:{},
            inputModeCardKey: null,
            dialogOpen: false,
            board_key: board.key,
            updateBoardTitle: board.title,
            updateBoardDescription: board.description,
            confirmDelete: false,
        }
      }
    
    componentDidMount () {
        const myCard = firebase.database().ref("cards/");
        myCard.orderByChild("boardKey").equalTo(this.props.match.params.key).on("value", snapshot => {
            this.setState({cards: snapshot.val() || {}}); 
        });
    }

    toggleIsInputMode = (key) => {
        this.setState({inputModeCardKey: key});   
    }
    
    openUpdateDialog = (boardDetails) => {
        this.setState({
            dialogOpen: true,
            board_key: boardDetails.key,
        });
    }

    editBoardDetails = (boardDetails) => {
        firebase.database().ref("boards/" + boardDetails.key).update({
            title: this.state.updateBoardTitle,
            description: this.state.updateBoardDescription
          });
        this.setState({dialogOpen: false});
        const board_session = {
            description: this.state.updateBoardDescription,
            title: this.state.updateBoardTitle,
            key: this.state.board_key
        }
        sessionStorage.setItem('board',JSON.stringify(board_session));
    }

    handleClose = () => {
        this.setState({
            dialogOpen: false,
            confirmDelete: false,
        });
    };

    openDeleteDialog = () => {
        this.setState({
            confirmDelete: true,
        });
    }

    deleteBoard = (deleteBoardKey, mycards) => {
        const userID = sessionStorage.getItem("userID");
        const notesRefs = firebase.database().ref("notes/")
        var cards_keys = {};

        //delete cards inside board
        for (let i = 0; i < mycards.length; i++){
            cards_keys[i] = mycards[i].key;
            this.deleteCard(mycards[i].key);
        }
        
        //delete notes inside cards
        for (let j = 0; j < mycards.length; j++){
            notesRefs.orderByChild("cardKey").equalTo(cards_keys[j]).once("value", 
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    this.deleteNote(childSnapshot.key);
                }) 
            });
        }        

        firebase
            .database()
            .ref("boards/" + userID + "/" + deleteBoardKey)
            .remove();
        
        window.location.href = `/${"board-dashboard"}`;
    }

    deleteCard = (deleteCardKey) => {
        firebase.database().ref(`cards/${deleteCardKey}`).remove();
    }

    deleteNote = (deleteNoteKey) => {
        firebase.database().ref(`notes/${deleteNoteKey}`).remove();
    }

    render () {
        var cards = Object.keys(this.state.cards).map(key => {
            var isInputMode = (this.state.inputModeCardKey === key) ? true : false;           
            var card = this.state.cards[key];
            card.key = key;
            return <ListPanel 
                    key={key} 
                    card={card} 
                    isInputMode={isInputMode} 
                    toggleIsInputMode={(key) => this.toggleIsInputMode(key)}
                    />
        });

        const boardDetails = JSON.parse(sessionStorage.getItem("board"));
        
        return (
            <div>
            <NavBar/>
            <div className = "my-board-container">            
            {/* <div className = "sidebar-btn">
                    <IconButton>
                        <DehazeIcon/>
                    </IconButton>
            </div> */}
            <div className="board-title-container">
                <p className="board-title">
                    {this.state.updateBoardTitle}
                </p>
            </div>
            <div className="board-description-container">
                <div className="board-description-container-2">
                <p className="board-description">
                    {this.state.updateBoardDescription}
                </p>
                </div>

                <div className="board-buttons">
                    <div className="board-button-align">
                        <Button edge="end" variant="contained" color="primary" startIcon={<EditIcon />} 
                        onClick={() => this.openUpdateDialog(boardDetails)} >
                            Edit
                        </Button>
                    </div>
                    
                    <div className="board-button-align2">
                        <Button edge="end" variant = "contained" color="secondary" startIcon={<DeleteIcon />}
                            onClick={this.openDeleteDialog}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            <div className="cardform-container">
                <ListForm boardKey={this.props.match.params.key} />
            </div>

            <div className = "cards-arrangement">
                {cards}
                <Dialog open={this.state.dialogOpen} onClose={this.handleClose}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="normal"
                            label="Edit Board Title"
                            type="text"
                            variant="outlined"
                            fullWidth
                            name="updateBoardTitle"
                            defaultValue={this.state.updateBoardTitle}
                            onChange={e => this.setState({updateBoardTitle: e.target.value})}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="normal"
                            label="Edit Board Description"
                            type="text"
                            variant="outlined"
                            fullWidth
                            name="updateBoardDescription"
                            defaultValue={this.state.updateBoardDescription}
                            onChange={e => this.setState({updateBoardDescription: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editBoardDetails(boardDetails)} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog 
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    open={this.state.confirmDelete} 
                    onClose={this.handleClose}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete Board"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"Are you sure you want to delete your board named '" + this.state.updateBoardTitle + "'?"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={() => this.deleteBoard(this.state.board_key, cards)} color="primary" autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>
            
            </div>
            <Footer/>
            </div>
        );
    }
}

export default Board;