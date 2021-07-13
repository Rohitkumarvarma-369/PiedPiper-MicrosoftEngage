//Navbar using react-bootstrap to create navigation between different components

import React, { useState } from "react"
import { Card, Alert, Dropdown, Tabs, Tab} from "react-bootstrap"
import { useAuth } from "../../Login/LoginContexts/AuthContext"
import { useHistory } from "react-router-dom"
import "./Navbar.css"

import VideoContent from "../VideoContent/VideoContent"
import Whiteboard from "../WhiteboardCollab/whiteboard"
import PiperDocsHome from "../DocumentCollab/piperdocshome"
import ChatApp from "../ChatContent/ChatApp"
import EntranceContent from "../Home/EntranceContent.js";

export default function Navbar (){


  return(
    <>
    <Tabs fill defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab eventKey="home" title="Home">
          <EntranceContent/>
        </Tab>
        <Tab eventKey="video" title="Video Call">
          <VideoContent/>
        </Tab>
        <Tab eventKey="chat" title="Chat">
          <ChatApp />
        </Tab>
        <Tab eventKey="whiteboard" title="Whiteboard">
          <Whiteboard />
        </Tab>
        <Tab eventKey="documenteditor" title="Live Document Editor">
          <PiperDocsHome />
        </Tab>
    </Tabs>
    </>

  )
}
