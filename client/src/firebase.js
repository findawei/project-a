// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";
// Add the Firebase services that you want to use
// We only want to use Firebase Auth here

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

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  export default firebase;


// Initialize Provider & Export
export const microsoftProvider = new firebase.auth.OAuthProvider('microsoft.com')
// .setCustomParameters({
//   // login_hint: 'user@organization.com',
//   tenant: 'common',  
//   // Put Tenant Id from Azure registered app,
//   // prompt: 'consent' // Get Consent from user to access their basic info (optional - Reommended only during SignUp)
// })
.addScope('calendars.read')
.addScope('mail.read');

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
