import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/database'

const app = firebase.initializeApp({
    apiKey: "AIzaSyANHN64tf8qlSHgrr6U8nSr2aZPx2ihGoU",
    authDomain: "noto-13.firebaseapp.com",
    databaseURL: "https://noto-13.firebaseio.com",
    projectId: "noto-13",
    storageBucket: "noto-13.appspot.com",
    messagingSenderId: "1093198433828",
    appId: "1:1093198433828:web:9a021bad9e842db21112b1"
})

export const auth = app.auth()
export const db = app.database();
export default app
