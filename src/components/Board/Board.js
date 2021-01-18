import React, { Component } from "react"
import firebase from "firebase/app"
import ListPanel from "./ListPanel"
import ListForm from "./ListForm"
import NavBar from "../NavBar";
import Footer from "../Footer";
import {Button, IconButton, Dialog, DialogContent, DialogActions, TextField} from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import EditIcon from '@material-ui/icons/Edit';
import './board.css';

class Board extends Component {

    constructor() {
        super();
        const board = JSON.parse(sessionStorage.getItem("board"))
        this.state = {
            cards: {},
            inputModeCardKey: null,
            dialogOpen: false,
            board_key: board.key,
            updateBoardTitle: board.title,
            updateBoardDescription: board.description,
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
        });
    };

    render () {
        var counter = 0;
        var cards = Object.keys(this.state.cards).map(key => {
            counter = counter + 1;
            var isInputMode = (this.state.inputModeCardKey === key) ? true : false;           
            var card = this.state.cards[key];
            card.key = key;
            return <ListPanel 
                    counter={counter}
                    key={key} 
                    card={card} 
                    isInputMode={isInputMode} 
                    toggleIsInputMode={(key) => this.toggleIsInputMode(key)}
                    />
        });

        const boardDetails = JSON.parse(sessionStorage.getItem("board"));
        
        return (
            <>
            <NavBar/>
            {/* <div className = "sidebar-btn">
                    <IconButton>
                        <DehazeIcon/>
                    </IconButton>
            </div> */}
            <div className="board-title-container">
                <p className="board-title">
                    {this.state.updateBoardTitle}
                </p>
                <IconButton aria-label="Edit" onClick={() => this.openUpdateDialog(boardDetails)} >
                    <EditIcon/>
                </IconButton>
            </div>
            <div className="board-description-container">
                <p className="board-description">
                    {this.state.updateBoardDescription}
                </p>
                <IconButton aria-label="Edit" onClick={() => this.openUpdateDialog(boardDetails)} >
                    <EditIcon/>
                </IconButton>
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
            </div>
            <div className="cardform-container">
                <ListForm boardKey={this.props.match.params.key} />
            </div>
            
            <Footer/>
            </>
        );
    }
}

export default Board;