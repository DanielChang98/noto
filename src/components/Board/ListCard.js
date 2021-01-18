import React, { Component } from "react"
import firebase from "firebase/app"
import './board.css';
import { Button, IconButton, Menu, MenuItem, Dialog, DialogContent, DialogActions, TextField} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class ListCard extends Component {
    
    constructor (){
        super();
        this.state = {
            anchorEl: null,
            dialogOpen: false,
            updateNote: "",
            noteListKey: null,
        }
    }

    componentDidMount () {
        this.notesRef = firebase.database().ref("notes/")
    }

    handleDeleteNote = key => {
        firebase.database().ref(`notes/${key}`).remove();
        console.log("Successful delete note!");
    }

    handleOnDragStart = e => {
        e.dataTransfer.setData('note', JSON.stringify(this.props.note));
    }

    handleClick = e => {
        this.setState({anchorEl: e.currentTarget});
        console.log(e.currentTarget);
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }

    openUpdateDialog = (theNote) => {
        this.setState({
            anchorEl: null,
            dialogOpen: true,
            updateNote: theNote.text,
            noteListKey: theNote.listKey,
        });
    }

    editNote = (theNote) => {
        firebase.database().ref("notes/" + theNote.key).update({
            cardKey: theNote.cardKey,
            text: this.state.updateNote,
        });
        this.setState({dialogOpen: false});
    }

    handleCloseDialog = () => {
        this.setState({
            dialogOpen: false,
        });
    }

    render () {
        return (
            <div className="note" draggable="true" onDragStart={this.handleOnDragStart}>
                <p>{this.props.note.text}</p>
                <div>
                <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick = {(e) => this.setState({anchorEl: e.currentTarget})}
                    >
                <MoreVertIcon className = "noteMenu"/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem 
                        onClick = {() => {this.openUpdateDialog(this.props.note)}}
                        >Edit</MenuItem>
                    <MenuItem 
                        onClick = {() => {this.handleDeleteNote(this.props.note.key)}}
                        >Delete</MenuItem>
                </Menu>
                </div>
                <Dialog open={this.state.dialogOpen} onClose={this.handleCloseDialog}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="normal"
                            label="Edit Note"
                            type="text"
                            variant="outlined"
                            fullWidth
                            name="updateNote"
                            defaultValue={this.state.updateNote}
                            onChange={e => this.setState({updateNote: e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.editNote(this.props.note)} color="primary">
                            Save
                        </Button>
                        </DialogActions>
                </Dialog>
            </div>

        );
    }
}

export default ListCard;