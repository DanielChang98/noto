import React, { useState } from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
import { FormControlLabel, Checkbox, Button, TextField, IconButton, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import firebase from "firebase";

function Todo(props) {
    const listID = sessionStorage.getItem("listID");
    const databaseRef = firebase.database().ref();
    const todosRef = databaseRef.child("toDo/"+listID)
    const { todo } = props;

    const [open, setOpen] = useState(false);
    const [updateTitle, setUpdateTitle] = useState('');
    const [toUpdateId, setToUpdateId] = useState('');

    const updateStatus = () => {
    todosRef.child(todo.id).set({...todo,status:!todo.status})
    }

    const openUpdateDialog = (todo) => {
        setOpen(true);
        setToUpdateId(todo.id);
        setUpdateTitle(todo.name);
    }

    const editTodo = () => {
        firebase.database().ref('toDo/'+ listID +'/'+toUpdateId).update({
          title: updateTitle
        });
        setOpen(false);
      }
      
    const handleClose = () => {
        setOpen(false);
    };
    
    const BlueCheckbox = withStyles({
        root: {
          color: indigo[900],
          '&$checked': {
            color: indigo[900],
          },
        },
        checked: {},
      })((props) => <Checkbox color="default" {...props} />);

  return (
    <div className="todo-item-container">
        <div className="todo-item">
            <FormControlLabel
            control={<BlueCheckbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckIcon />} name="checkStatus" 
            checked={todo.status} onChange={updateStatus}/>}
            />
            <p>{todo.title}</p>
        </div>
        
        <div className="todo-button">
            <IconButton edge="end" aria-label="Edit" onClick={() => openUpdateDialog(todo)}>
                <EditIcon/>
            </IconButton>

            <IconButton aria-label="delete" onClick={e => todosRef.child(todo.id).remove()}>
                <DeleteIcon/>
            </IconButton>
        </div>
        
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="normal"
                label="Edit Task"
                type="text"
                fullWidth
                name="updateTodo"
                value={updateTitle}
                onChange={event => setUpdateTitle(event.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={editTodo} color="primary" disabled={!updateTitle}>
                Save
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    
  );
}
export default Todo;