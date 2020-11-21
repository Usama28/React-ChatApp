import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from '../views/Login'
import Signup from '../views/Signup'
import Chat from '../views/Chat'
import Chatroom from '../views/Chatroom'

function RouterFunc() {
    return (
      <div >
        <Router>
    
        <Switch>
        <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/Signup">
            <Signup />
          </Route>
          <Route path="/Chat">
            <Chat />
          </Route>
          <Route path="/Chatroom">
            <Chatroom />
          </Route>  
        </Switch>
      
    </Router>
      </div>
    );
  }
  
  export default RouterFunc;