import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {getAllUsers,joinRoom} from '../../config/Firebase'
import { Image , Card, Feed,Button,Accordion} from 'semantic-ui-react'
import firebase from '../../config/Firebase'

function Chat({isLoggedIn}) {

    const [users,setUsers]=useState([])
    const history = useHistory()
    useEffect(()=>{
      userFunction()
    },[])

    const userFunction=async function(){
      try{
        const response =await getAllUsers()
        const tempUsers=[]
        response.forEach(doc=>{
            tempUsers.push({...doc.data() , id:doc.id})
        })
        setUsers(tempUsers)
        console.log(users)
      }
      catch(e){
        alert(e.message)
      }
    }

    const navigateToChat=async function(id,fullName){
      const chatroom = await joinRoom(id)
      console.log('chatroom***',chatroom)
      localStorage.setItem('name',fullName)
      history.push(`/chatroom/${chatroom.id}`)
    }
    return (
      <div >
        
          <Card >
                <Card.Content>
                  <Card.Header 
                     style={{display:'flex',justifyContent:'space-between'}} 
                  >
                          <span>Chats</span>
                        <Button secondary size='mini' onClick={()=>firebase.auth().signOut()}>Log Out</Button>
                  </Card.Header>
                  <Card.Meta >{isLoggedIn.userEmail}</Card.Meta>
                </Card.Content>
                <Card.Content>
                  {users.map (item=>{
                    return <div>
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                          <Feed.Content>
                            <Feed.Summary>

                                <Accordion>
                                     <Accordion.Title 
                                         onClick={()=>navigateToChat(item.id,item.fullName)}>
                                            {item.fullName}
                                      </Accordion.Title>
                                </Accordion>

                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </div>
                  })}
                  
                </Card.Content>
            </Card>
          
      </div>
    );
  }
  
  export default Chat;