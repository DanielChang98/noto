import firebase from "../firebase"

export default function AddTime(){
    const db = firebase.database();
    const user = firebase.auth().currentUser;
    const id = user.uid;

    
}