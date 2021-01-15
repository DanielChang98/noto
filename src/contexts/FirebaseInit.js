import React from "react"
import firebase from "../firebase"

const array = [
    "hours",
    "userTimerReport"
];

/**
 * @summary: add the new sign up user ID into 'hours' and 'userTimerReport' in real time database.
 */

export default function FirebaseInit(){
    var date = new Date();
    var isExist=true;
    const db = firebase.database();
    const user = firebase.auth().currentUser;
    const id = user.uid;

    let day = new Date(date).toISOString().slice(0, 10);

    array.map((value)=>{
        const refDB = db.ref(value+"/");
        refDB.once('value').then((snapshot) => {
            snapshot.forEach(snap=>{
                if(snap.key===user.uid){
                    isExist=false;
                }
            });
            if(isExist==true){
                if(value=="hours"){
                    refDB.child(id).set(
                        {
                            [day]: {
                                hour: 0,
                                date: day
                            }
                        }
                    );
                }
                else if(value=="userTimerReport"){
                    refDB.child(id).set(
                        {
                            hoursFocused: 0,
                            daysAccessed: 1,
                            daysStreak: 1
                        }
                    );
                }
            }
            isExist=true;
          });
    });
}