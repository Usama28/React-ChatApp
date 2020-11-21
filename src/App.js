import React,{useState,useEffect} from 'react'
import './App.css';
import Router from './config/Router'
import firebase from './config/Firebase'

function App() {

  const [isLoading, SetLoading] = useState(true)
  const [isLoggedIn, SetLogged] = useState(true)

  useEffect(() => {
    stateAuthentication()
  }, [])
  const stateAuthentication = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      SetLogged(user ? { userEmail: user.email } : false)
      SetLoading(false)

    })
  }


  return (
    <div className="App">
      <header className="App-header">
        {isLoggedIn && <h1>{isLoggedIn.userEmail}</h1>}
        <Router isLoggedIn={isLoggedIn } isLoading={isLoading}/>
      </header>
    </div>
  );
}

export default App;
