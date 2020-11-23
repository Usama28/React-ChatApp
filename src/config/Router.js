import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from '../views/Login'
import Signup from '../views/Signup'
import Chat from '../views/Chat'
import Chatroom from '../views/Chatroom'

function RouterFunc({isLoading,isLoggedIn}) {

  if (isLoading) 

  {
    return <div style={{ textAlign: 'center', marginTop: '5%' }}>
        <img width='300' src="https://i.pinimg.com/originals/49/db/58/49db58121197c490352b4ab3d978b6b0.gif" />
    </div>
  }
    const currentPath = window.location.pathname.length === 1 ? 'Chat' : window.location.pathname
    console.log(currentPath)

    return (
      <div >
        <Router>
          <Switch>
                <Route path="/" exact>
                  {isLoggedIn ? < Redirect to={currentPath} /> : <Login />}
                </Route>
                <Route path="/Signup">
                  {StateChecker(isLoggedIn, <Signup />)}
                </Route>
                <Route path="/Chat">
                  {AuthChecker(isLoggedIn, <Chat isLoggedIn={isLoggedIn} />)}
                </Route>
                <Route path="/Chatroom/:ChatId">
                {AuthChecker(isLoggedIn,<Chatroom />)}
                </Route>  
          </Switch>
        </Router>
      </div>
    );
  }
  
function AuthChecker(loggedValue, component) {
    return loggedValue ? component : <Redirect to='/' />
}
function StateChecker(stateValue, component) {
  return !stateValue ? component : <Login />
}
  export default RouterFunc;