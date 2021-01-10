import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import {Avatar} from '@material-ui/core';
import db from './firebase'
import { Link } from "react-router-dom";

/* useState hook returns an array of values inside useState bracket wew write the default value of state
Inside its array we use two values the state and function that will change state*/

function SidebarChat({ id, name, addNewChat }){

    const [seed, setSeed] = useState("");

   /* useEffect(() => {
         if(id){
              db.collection("rooms").doc(id).collection("messages").orderBy
         }
    },[])*/

    useEffect(() => {
         setSeed(Math.floor(Math.random() * 5000))
    }, []);

    const createChat = () => {
         const roomName = prompt("Please enter the name of chat");

         if(roomName){
              db.collection("rooms").add({
                   name: roomName,
              });
         }
    }

    return !addNewChat?(
         <Link to = {`/rooms/${id}`}>
         <div className="sidebarChat">
         <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
         <div className="chatInfo"> 
         <h2>{name}</h2>
         <p>Last message...</p>
         </div>
         </div>
         </Link>
         
    ) :(
         <div onClick={createChat} className="sidebarChat">
          <h2>Add new Chat</h2>
         </div>
    );
}

export default SidebarChat;