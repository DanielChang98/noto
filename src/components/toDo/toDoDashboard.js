import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import './toDo.css';
import Loader from "./loader";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import firebase from "firebase/app";
import {IconButton, Button, Dialog, DialogContent, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function ToDoDashboard(){
    // Function to redirect to 'toDoList' page
  const userID = sessionStorage.getItem("userID");
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [lists,setList]  = useState([]);
  const [deleteID, setDeleteID] = useState('');
  const [loading, setLoading] = React.useState(true)

  //set colours of the to do list
  var colour="";

  const databaseRef = firebase.database().ref();
  const todosRef = databaseRef.child("toDoList/"+userID);

  useEffect(() => {
    todosRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          tag: items[item].tag,
          colour: items[item].colour
        });
      }
      setList(newState)
      setLoading({loading: false})
    });
    if (loading) {
      setTimeout(() => {
      setLoading(false);
    }, 1400);
    }
  },[])

  const handleSubmit = async e => 
    {
      e.preventDefault();

      if(tag==="Personal")
        colour="#C1DEFF";
      else if(tag==="Work")
        colour="#CCF3FF";
      else if(tag==="Hobby")
        colour= "#91DDE8";
      else if(tag==="Others")
        colour= "#E6CDFF";

      var listKey = firebase.database().ref().child('toDoList').push().key;
      firebase.database().ref('toDoList/' + userID + '/' + listKey).set({
        title: title,
        tag : tag,
        colour: colour
        })
        .then(() => {
          setTitle("");
          setTag("");
      });
    }

    const viewList = async e =>
    {
      e.preventDefault();
      const todolist = JSON.parse(sessionStorage.getItem('todolist'));
      console.log("LIST Name: "+todolist.title)
      window.location.href = `/${"to-do-list"}`
    }

    const handleClose = () => {
      setOpen(false);
    };

    const openDeleteDialog = (todolist) => {
      setOpen(true);
      setDeleteID(todolist.id);
    }

    const confirmDelete = () => {
      const todosItemRef = databaseRef.child("toDo/"+userID);
      todosRef.child(deleteID).remove();
      todosItemRef.child(deleteID).remove();
      setOpen(false);
    }

		return(
      <>
      <NavBar/>
      <div className = "todo-dashboard-container">
          <div className = "upper-container">
            <form method = "post" onSubmit ={handleSubmit}>
            <div className = "align-row">
              <div className = "title">
              <TextField id="todo-title" label="Title" 
                required
                value = {title}
                onChange = {(e) => setTitle(e.target.value)}/>
              </div>

              <div className="tag-list">
                <FormControl variant="outlined" className="list" required>
                  <InputLabel id="demo-simple-select-outlined-label">Tag</InputLabel>
                  <Select
                    labelId="tag"
                    id="tag"
                    value = {tag}
                    onChange = {(e) => setTag(e.target.value)}
                    label="Tag"
                  >
                  <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem className="personal" value={"Personal"}>Personal</MenuItem>
                    <MenuItem className="work" value={"Work"}>Work</MenuItem>
                    <MenuItem className="hobby" value={"Hobby"}>Hobby</MenuItem>
                    <MenuItem className="others" value={"Others"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <button className = "addBtn" type="submit">
                  <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            
            </form>
          </div>

          <div className="todo-container">
          { loading === true ?
          <Loader />
          :
          null
          }
          <div className="todolist-card-container" >
          {lists.map((todolist) => (
            <React.Fragment key={todolist.id}>
              
              <form method = "post" onSubmit ={viewList}>
                <button onClick={sessionStorage.setItem('todolist',JSON.stringify(todolist))} type="submit" className="todolist-card" style={{backgroundColor: todolist.colour}}>
                  <IconButton type="reset" className="deleteList" onClick={() => openDeleteDialog(todolist)}>
                    <CloseIcon/>
                  </IconButton>
                  <p>{todolist.title}</p>
                  <p className="list-tag">{todolist.tag}</p>
                </button>
              </form>
              
            </React.Fragment>
          ))}
          </div>
          </div> 
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              Are you sure you want to delete?
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={() => confirmDelete()} color="primary">
                Delete
            </Button>
            </DialogActions>
        </Dialog> 
        </div>
        <Footer/>
      </> 
    )
}

export default ToDoDashboard;

