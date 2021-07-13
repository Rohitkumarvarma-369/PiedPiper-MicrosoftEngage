//App in chat component
import React, {useState} from "react";
import Loginpage from './views/LoginPage';
import Homepage from './views/Homepage';
import useLocalStorage from './CommonStates/LocalStorageHook'
import { SocketProvider } from "./CommonStates/SocketContext";
import { ContactsProvider } from "./CommonStates/ContactsContext";
import { ConversationsProvider } from "./CommonStates/ChatsContext";

const ChatApp = () =>{
  const [id, setID] = useLocalStorage("id");

  const homepage = (
    <>
      <SocketProvider id={id}>
        <ContactsProvider>
          <ConversationsProvider id={id}>
            <Homepage id={id}/>
          </ConversationsProvider>
        </ContactsProvider>
      </SocketProvider>
    </>
  );

  if(id){
    return(
      homepage
    )
  }
  else{
    return(
      <Loginpage onLoginGenerateID={setID}/>
    )
  }


};

export default ChatApp;
