import React, { useState ,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {sendMessagetoDb,getMessages} from '../../config/Firebase'
import firebase from '../../config/Firebase'
import { Image , Card, Feed,Button,Accordion} from 'semantic-ui-react'


function Chatroom() {

  // const params=useParams()
  //console.log(params.ChatId)
  const {ChatId}=useParams()
  const [message,setMessage]=useState('')
  const [messageList,setMessageList]=useState([])
  const userId=localStorage.getItem('userId')
  const displayName=localStorage.getItem('name')

  useEffect(()=>{
    showMessages()
  },[])

  const showMessages=async ()=>{
    const response=await getMessages(ChatId)
    const tempMessages=[]
    response.forEach(doc=>{
        tempMessages.push(doc.data())
    })
    setMessageList(tempMessages)
  }

  const sendMessage=async()=>{
    await sendMessagetoDb(message,ChatId)
    showMessages()
    setMessage('')
  }
 
    return (
      <div >
        <h1>chatroom</h1>
        <div>
            {messageList.map(item=>{
              return <div style={{textAlign : userId===item.userId ? 'right' : 'left'}}>
                <p>{item.message}</p>
            <p>{item.timeStamp}</p>
              </div>
            })}          
        </div>
        <div>
          <input type='text' value ={message} onChange={(e)=> setMessage(e.target.value)} />
          <button onClick={()=> sendMessage()}>Send</button>
        </div>

        <Card >
                <Card.Content>
                  <Card.Header 
                     style={{display:'flex',justifyContent:'space-between'}} 
                  >
                          <div>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' avatar />
                            <span>{displayName}</span>
                          </div>
                        <Button secondary size='mini' onClick={()=>firebase.auth().signOut()}>Log Out</Button>
                  </Card.Header>
          
                </Card.Content>
                <Card.Content style={{height:'400px'}}>
                  
                      <Feed>
                        <Feed.Event>
                         
                          <Feed.Content>
                            <Feed.Summary>

                             
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>
                      </Feed>
                   
                  
                </Card.Content>
            </Card>

      </div>
    );
  }
  
  export default Chatroom;