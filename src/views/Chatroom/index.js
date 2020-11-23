import React, { useState ,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {sendMessagetoDb,getMessages} from '../../config/Firebase'
import firebase from '../../config/Firebase'
import { Image , Card, Icon,Button,Accordion,Input} from 'semantic-ui-react'


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
          <Card >
                <Card.Content>
                  <Card.Header 
                     style={{display:'flex',justifyContent:'space-between'}} 
                  >
                          <div>
                          <Icon  name='arrow left' size='small' />
                            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' avatar />
                            <span>{displayName}</span>
                          </div>
                        <Button secondary size='mini' onClick={()=>firebase.auth().signOut()}>
                            Log Out 
                        </Button>
                  </Card.Header>
          
                </Card.Content>
                
               
                  <Card.Content style={{height:'400px',overflow: 'auto', backgroundColor:'#F2F3F4'}}>
                    {messageList.map(item=>{
                      return <div style={{textAlign : userId===item.userId ? 'right' : 'left',
                                           backgroundColor:userId===item.userId ?'black' : 'white',
                                           color:userId===item.userId ? 'white' : 'black',
                                           margin:userId===item.userId ? '1% 0% 1% 38%': '1% 38% 1% 0%',
                                          border:'1px solid transparent',
                                          borderRadius:'8px',
                                          padding:'3%'

                                          }}>
                        <p>{item.message}</p>
                        <Card.Meta 
                                  style={{textAlign:'right',
                                  color:userId===item.userId ? 'grey' : '',
                                  fontSize:'10px'
                                  }}>
                                  {item.timeStamp}
                        </Card.Meta>
                      </div>
                    })} 
                  </Card.Content>         
                
                  <Card.Content >       
                            <Input 
                                fluid 
                                placeholder='Type a message...'
                                style={{position:'absolute' , bottom:0 ,width:'260px' ,marginBottom:'3%'}}
                                type='text' value ={message} onChange={(e)=> setMessage(e.target.value)}
                                action={
                                <Button color='teal' onClick={()=> sendMessage()}>send</Button>
                              }/>
                          
                </Card.Content>
            </Card>

      </div>
    );
  }
  
  export default Chatroom;