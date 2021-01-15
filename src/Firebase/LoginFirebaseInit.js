import firebase from "../firebase"

export default function LoginFirebase(){
    var date = new Date();
    var isExist=false;
    const db = firebase.database();
    const user = firebase.auth().currentUser;
    const id = user.uid;

    let day = new Date(date).toISOString().slice(0, 10);

    const refDB = db.ref("hours/");
    refDB.once('value').then((snapshot) => {
        snapshot.forEach(snap=>{
            if(snap.key===user.uid){
                snap.forEach((child)=>{
                    if(child.key===day){
                        isExist=true;
                    }
                })
            }
        });
    });
    
    if(!isExist){
        refDB.child(id).child(day).set(
            {
                hour: 0,
                date: day
            }
        )
        
    }
}