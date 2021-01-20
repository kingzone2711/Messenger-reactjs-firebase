import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCoecyG3exjYiR1oydVb9WXTUd1Bj9EAiA",
  authDomain: "realtime-project-42296.firebaseapp.com",
  databaseURL: "https://realtime-project-42296-default-rtdb.firebaseio.com",
  projectId: "realtime-project-42296",
  storageBucket: "realtime-project-42296.appspot.com",
  messagingSenderId: "558203955038",
  appId: "1:558203955038:web:5710c060517b5af42891cf",
  measurementId: "G-SC36V8LPYT"
};
firebase.initializeApp(firebaseConfig)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
