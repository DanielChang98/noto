import React, {useState, useEffect} from "react";
import Todo from "./toDo";
import Loader from "./loader";
import firebase from "firebase";

function ToDoList() {
  const listID = sessionStorage.getItem("listID");
  const databaseRef = firebase.database().ref();
  const todosRef = databaseRef.child("toDo/"+listID);
  const [loading, setLoading] = React.useState(true)
  const [todos,setTodos]  = useState([]);
  useEffect(() => {
    todosRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          status: items[item].status,
          listID: listID
        });
      }
      setTodos(newState)
      setLoading({loading: false})
    });
    if (loading) {
      setTimeout(() => {
      setLoading(false);
    }, 1400);
    }
  },[])

  return (
    <>
      { loading === true ?
      <Loader />
      :
      null
      }
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <Todo  todo={todo} />
          <div className="border-line"></div>
        </React.Fragment>
      ))}
    </>
  );
}
export default ToDoList;