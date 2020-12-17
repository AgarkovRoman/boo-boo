import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {firebase} from "./firebase";
import {FirebaseContext} from './context/firebase'

ReactDOM.render(
    <FirebaseContext.Provider value={{firebase}}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);
