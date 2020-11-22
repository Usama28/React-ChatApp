import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {getAllUsers,joinRoom} from '../../config/Firebase'
import { Image , Card, Feed,Button} from 'semantic-ui-react'

function Chat() {

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

    const navigateToChat=async function(id){
      const chatroom = await joinRoom(id)
      console.log('chatroom***',chatroom)
      history.push(`/chatroom/${chatroom.id}`)
    }
    return (
      <div >
        
          <div className='chats'>
          <Card>
                <Card.Content>
                  <Card.Header>Chats</Card.Header>
                </Card.Content>
                <Card.Content>
                  {users.map (item=>{
                    return <div>
                      <Feed>
                        <Feed.Event>
                          <Feed.Label image='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                          <Feed.Content>
                            <Feed.Summary>
                                {item.fullName} 
                                <Button style={{margin:'0% 16%'}} onClick={()=>navigateToChat(item.id)}>hello</Button>
                               
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                    </div>
                  })}
                  
                </Card.Content>
            </Card>
          </div>
      </div>
    );
  }
  
  export default Chat;