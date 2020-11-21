import React,{useState,useEffect} from 'react'
import {getAllUsers} from '../../config/Firebase'

function Chat() {

    const [users,setUsers]=useState([])
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

    return (
      <div >
        <h1>Chats</h1>
        {users.map((item)=>{
          return <div>
             <li>{item.fullName} <button>Chat</button></li>
             
             </div>
          })
        }
      </div>
    );
  }
  
  export default Chat;