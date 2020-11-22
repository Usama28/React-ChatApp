import React, { useState ,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {sendMessagetoDb,getMessages} from '../../config/Firebase'

function Chatroom() {

  // const params=useParams()
  //console.log(params.ChatId)
  const {ChatId}=useParams()
  const [message,setMessage]=useState('')
  const [messageList,setMessageList]=useState([])
  const userId=localStorage.getItem('userId')

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

      </div>
    );
  }
  
  export default Chatroom;