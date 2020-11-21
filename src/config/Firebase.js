import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyCoHGcytfqmUHtS6T9qtOwTMAbY7fGgRRo",
  authDomain: "chat-app-b814e.firebaseapp.com",
  databaseURL: "https://chat-app-b814e.firebaseio.com",
  projectId: "chat-app-b814e",
  storageBucket: "chat-app-b814e.appspot.com",
  messagingSenderId: "417379334339",
  appId: "1:417379334339:web:b0bb7281cae46f59698a76",
  measurementId: "G-9522NTGNMG"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  function SignupUser(email,password)
  {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  function SigninUser(email,password){
    return firebase.auth().signInWithEmailAndPassword(email,password)
  }

  function FacebookSignIn(provider){
    var provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  function googleSignIn(googleProvider){
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
  }

  async function getAllUsers(){
    return await firebase.firestore().collection('users').get()
  }

  export {
    SignupUser,
    SigninUser,
    googleSignIn,
    FacebookSignIn,
    getAllUsers
  }
  export default firebase