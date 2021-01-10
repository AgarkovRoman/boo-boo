import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyChqBDn0E3oHkpSERR9Wl3rCY2VG0HrdeE',
  authDomain: 'superapp-3aa57.firebaseapp.com',
  databaseURL: 'https://superapp-3aa57.firebaseio.com',
  projectId: 'superapp-3aa57',
  storageBucket: 'superapp-3aa57.appspot.com',
  messagingSenderId: '568179776426',
  appId: '1:568179776426:web:ae83f3b6b66636a7ade9d3',
  measurementId: 'G-W79CJ8Y5MX',
})

export { firebaseConfig as firebase }
