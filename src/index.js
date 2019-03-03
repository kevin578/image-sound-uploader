import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import * as serviceWorker from './serviceWorker';


var config = {
    apiKey: "AIzaSyD1RW4tfRA1Ew5BzqZJYXecsLrCZHD1y0g",
    authDomain: "image-uploader-f27ab.firebaseapp.com",
    databaseURL: "https://image-uploader-f27ab.firebaseio.com",
    projectId: "image-uploader-f27ab",
    storageBucket: "image-uploader-f27ab.appspot.com",
    messagingSenderId: "570360801213"
  };

  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
