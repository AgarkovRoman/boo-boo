import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBUVXSJ78SJU-0yxCQlvzwXdoM-3vW0Dho",
    authDomain: "mynotion-b6b4f.firebaseapp.com",
    databaseURL: "https://mynotion-b6b4f.firebaseio.com",
    projectId: "mynotion-b6b4f",
    storageBucket: "mynotion-b6b4f.appspot.com",
    messagingSenderId: "390768865394",
    appId: "1:390768865394:web:c206129c1b5a0e117952eb",
    measurementId: "G-9FH99HB4QD"
})

export {firebaseConfig as firebase}
