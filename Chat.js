import React, { useEffect, useState } from "react";
import "./Chat.css";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase';

function Chat(){
 
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    console.log(firebase.firestore);

    useEffect(()=>{
      if(roomId){
          db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
              setRoomName(snapshot.data().name);
          });

          db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
              setMessages(snapshot.docs.map(doc => doc.data()))
          });

      }
  },[roomId])

    useEffect(() => {
      setSeed(Math.floor(Math.random() * 5000)); 
   }, [roomId]);
    
    const sendMessage = (e) =>{
         e.preventDefault();         
         db.collection("rooms").doc(roomId).collection("messages").add({
           message: input,
           name: user.displayName,
           timestamp: firebase.database.ServerValue.TIMESTAMP,
         })
         setInput("");
    };

    return(
        <div className = "chati">
           <div className = "chatHeader">
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

             <div className = "chataHeaderInfo">
                <h3>{ roomName }</h3>
                <p>Last seen at {" "} {
                  new Date(messages[messages.length - 1]?.
                  timestamp?.toDate()).toUTCString()
                }</p>
             </div>

             <div className = "chatHeaderRight">
                 <IconButton>
                     <AttachFile/> 
                 </IconButton>
                 <IconButton>
                     <MoreVertIcon/>
                 </IconButton>
             </div>
           </div>

        <div className = "chatBody">
          {
            messages.map(message => (
            <p className = {`chatMessage ${message.name === user.displayName &&  "chatReceiver"}`}>
             <span className="chatName">{ message.name}</span>
             {message.message}
             <span className="chatTimestamp">
              {/* {new Date(message.timestamp?.toDate()).toUTCString()}*/}
             </span>
            </p>
        ))
           }
        </div>

        <div className = "chatFooter">
          <InsertEmoticonIcon/>
          <form>
           {/* onChange of value it is considered as event setInput function is called  */}
              <input type="text" placeholder = "Type a message" value={input} onChange={(e) => setInput(e.target.value)}></input>
              <button type="submit" onClick = {sendMessage}>Send Message</button>
          </form>
          <MicIcon/>
        </div>
        </div>
    );
}

export default Chat