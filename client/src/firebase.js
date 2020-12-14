// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";  

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBwXoXqGlPDH730ra4zoF3zrQyE2f62nk4",
    authDomain: "tardy-b59dc.firebaseapp.com",
    databaseURL: "https://tardy-b59dc.firebaseio.com",
    projectId: "tardy-b59dc",
    storageBucket: "tardy-b59dc.appspot.com",
    messagingSenderId: "1072508881484",
    appId: "1:1072508881484:web:ae84ec800f9b3d7a3642e9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;