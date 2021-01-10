import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import image from './image.jpg';
import SidebarChat from './SidebarChat';
import {SearchOutlined} from '@material-ui/icons';
import db from "./firebase";

function Sidebar(){

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
       const unsub =  db.collection("rooms").onSnapshot((snapshot) =>
        
           setRooms(
               snapshot.docs.map((doc) => ({
                   id: doc.id,
                   data: doc.data(),
               }))
           )
           
        );
           return () => {
               unsub();
           };
    }, []);

    return(
        <div className="sidebar">
         <div className="sidebarHeader">
            <Avatar src = {image}></Avatar>
         <div className="sideBarHeader_right">
         <IconButton>              {/*wrapper class which adds a animation on click of buttons */}
             <DonutLargeIcon/>
         </IconButton>
         <IconButton>
             <ChatIcon/>
         </IconButton>
         <IconButton>
             <MoreVertIcon/>
         </IconButton>
         </div>
         </div>
         <div className="searchBar">
         <div className="searchBarContainer">
             <SearchOutlined></SearchOutlined>
             <input type="text" placeholder="Search or start new chat"/>
        </div>
         </div>
             <div className="chats">
                 <SidebarChat addNewChat/>
                 {rooms.map(room => (
                     <SidebarChat key = {room.id} id = {room.id} name ={room.data.name}/>
                 )
                 )}
             </div>
        </div>
    )
}

export default Sidebar;