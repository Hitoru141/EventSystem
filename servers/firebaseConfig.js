const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDLU4cp8yJTvQ0WLt1h50-56MExMBk-PhY",
    authDomain: "event-system-ffe08.firebaseapp.com",
    projectId: "event-system-ffe08",
    storageBucket: "event-system-ffe08.appspot.com",
    messagingSenderId: "568462177823",
    appId: "1:568462177823:web:1a130280937da8cff6072a",
    measurementId: "G-XBDMCH8NTH"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();



module.exports = db;
