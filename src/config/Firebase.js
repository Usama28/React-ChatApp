import firebase from 'firebase'
import moment from 'moment';
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

  async function joinRoom(friendId){

    const myId=localStorage.getItem('userId')
    try{
      
        const response=await firebase.firestore().collection('chatrooms')
        .where('user1','==',myId)
        .where('user2','==',friendId)
        .get()
        console.log('response******',response)
        let foundChatroom=false
        response.forEach(doc=>{
          foundChatroom={...doc.data(),id:doc.id}
        })
        
        if(foundChatroom) return foundChatroom

        const response2=await firebase.firestore().collection('chatrooms')
        .where('user2','==',myId)
        .where('user1','==',friendId)
        .get()

        response2.forEach(doc=>{
          foundChatroom={...doc.data(),id:doc.id}
        })
        
        if(foundChatroom) return foundChatroom

        return await firebase.firestore().collection('chatrooms').add({
          user1:localStorage.getItem('userId'),
          user2:friendId,
          timeStamp:moment().calendar()
        })
    }
    catch(e){
      alert(e.message)
    }

  }

  function sendMessagetoDb(message,ChatId){
    return firebase.firestore().collection('chatrooms').doc(ChatId).collection('messages').add({
      message,
      userId:localStorage.getItem('userId'),
      timeStamp:moment().calendar()
    })
  }

  function getMessages(ChatId){
    return  firebase.firestore().collection('chatrooms').doc(ChatId).collection('messages').orderBy('timeStamp','asc').get()
  }

  export {
    SignupUser,
    SigninUser,
    googleSignIn,
    FacebookSignIn,
    getAllUsers,
    joinRoom,
    sendMessagetoDb,
    getMessages
  }
  export default firebase