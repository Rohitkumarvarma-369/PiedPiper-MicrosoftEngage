import React, { useEffect, useState, useRef } from 'react';
import socket from '../../socket';
import "./Chat.css";
import {InputGroup, FormControl} from "react-bootstrap";

const Chat = ({ display, roomId }) => {//taking the roomID from the props passed from the room component
  const currentUser = sessionStorage.getItem('user');//getting the current user from the sessionStorage
  const [msg, setMsg] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef();
  
  useEffect(() => {//function to be triggered on recieving a message, to set the msg to show on the chat arena
    socket.on('FE-receive-message', ({ msg, sender }) => {
      setMsg((msgs) => [...msgs, { sender, msg }]);
    });
  }, []);

  // Scroll to Bottom of Message List
  useEffect(() => {scrollToBottom()}, [msg])//setting to scroolltobottom in useeffect to always scroll to the bottom

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  const sendMessage = (e) => {//function to be triggered when a message is sent 
    if (e.key === 'Enter') {//checking for enter key to be pressed
      const msg = e.target.value;

      if (msg) {
        socket.emit('BE-send-message', { roomId, msg, sender: currentUser });//socket emit the msg with the parameters like roomID, sender name
        inputRef.current.value = '';
      }
    }
  };
  //chat space with a header body to be filled with chats and a chat input field
  return (
    <div style={{textAlign: 'center'}}>
      <h1 className="chat-header">PiperChat mini</h1>
      <div className="chat-area-container">
        <div className="chat-message-container">
          {msg &&
            msg.map(({ sender, msg }, idx) => {
              if (sender !== currentUser) {
                return (
                  <span className="recieved-msg" key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </span>
                );
              } else {
                return (
                  <span className="sent-msg" key={idx}>
                    <strong>{sender}</strong>
                    <p>{msg}</p>
                  </span>
                );
              }
            })}
            <div style={{float:'left', clear: 'both'}} ref={messagesEndRef} />
        </div>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          ref={inputRef}
          onKeyUp={sendMessage}
          placeholder="Enter your message"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
    </div>
  );
};


export default Chat;
