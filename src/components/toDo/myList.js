import React from "react";
import ToDoList from "./toDoList"
import ToDoForm from "./toDoForm"
import NavBar from "../NavBar";
import Footer from "../Footer";
import './toDo.css';


function myList() {
    const todolist = JSON.parse(sessionStorage.getItem('todolist'));
    return(
        <div>
        <NavBar/>
            <div className="mylist-container">
            <div className="mylist" style={{backgroundColor: todolist.colour}}>
                <ToDoForm/>
                <div className="todolist-container">
                    <ToDoList/>
                </div>
            </div>
            </div>
            <Footer/>
        </div>
    
    )
}

export default myList;