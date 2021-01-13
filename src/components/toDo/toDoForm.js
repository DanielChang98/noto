import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase";

function ToDoForm() {
  
  const listID = sessionStorage.getItem("listID");
  const databaseRef = firebase.database().ref();
  const todosRef = databaseRef.child("toDo/"+listID)
  const [value, setValue] = useState("");
  const createTodo = (e) => {
    e.preventDefault();
    const item = {
      title: value,
      status: false,
      listID: listID
    };
    todosRef.push(item);
    setValue("");
  };
  return (
    <div className="todo-container">
        <form onSubmit={createTodo}>
            <div className="input-todo-container">
                <div className="input-todo">
                    <TextField
                    id="outlined-basic"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    label="Add Todo"
                    variant="standard"
                    fullWidth
                    inputProps={{ maxLength: 32 }}
                    autoComplete="off"
                    />
                </div>
                
                <button className = "add-todo-button" type="submit" disabled={!value}>
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    </div>
  );
}
export default ToDoForm;