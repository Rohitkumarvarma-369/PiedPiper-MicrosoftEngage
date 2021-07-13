import React from "react";
import {Container, Form, Button, Card, Row, Col} from "react-bootstrap";
import Header from './Header'
import ChatPreview from "./ChatPreview";
import OpenConversation from "./MainChatArena/ChatView";
import Sidebar from "./ChatOptions/ChatOptions";
import {useConversations} from "../CommonStates/ChatsContext";


export default function Homepage({id}){
  
  const { selectedConversation } = useConversations();

  return(
    <>

    <Header id={id}/>
    <div className="container-fluid" style={{ height: "85vh" }}>
      <Row>
        <div className="col-sm-3">
          <Sidebar id={id}/>
        </div>
        <div  className="col-sm-9">
          {!selectedConversation && <ChatPreview id={id} />}
          {selectedConversation && <OpenConversation />}

        </div>
      </Row>

    </div>


    </>
  )
}