import React from "react";
import ToDoList from "./toDoList"
import ToDoForm from "./toDoForm"
import './toDo.css';

function myList() {
    return(
    <div className="mylist-container">
        <div className="mylist">
            <ToDoForm/>
            <div className="todolist-container">
                <ToDoList/>
            </div>
        </div>
    </div>
    )
}

export default myList;