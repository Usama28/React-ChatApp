import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {getAllUsers,joinRoom} from '../../config/Firebase'
import { Image } from 'semantic-ui-react'

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
        <h1>Chats</h1>
        {/* {users.map((item)=>{
          return <div>
                 <li>
                    {item.fullName} 
                    <button onClick={()=>navigateToChat(item.id)}>Chat</button>
                </li>
             
             </div>
          })
        } */}
        <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-iNK3OdMdOoPK8xN85B8xONCvzgC0tVHSUw&usqp=CAU' size='small' />
        
      </div>
    );
  }
  
  export default Chat;