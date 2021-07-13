//Chat Context to provide Chat(Conversation) parameters and methods throught the application
import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "./LocalStorageHook";//using local storage for persistent data 
import { useContacts } from "./ContactsContext";
import { useSocket } from "./SocketContext";

const ConversationsContext = React.createContext();//creating a context

export function useConversations() {
  return useContext(ConversationsContext);
}
export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(//using local storage to fetch the conversations
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  function createConversation(recipients) {//method for creating new conversation
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }
  const addMessageToConversation = useCallback(//adding new message to the conversation the chat window
    ({ recipients, text, sender }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);//recieving the message and callng addMessage function to add the conversation

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {//send message and set sender id to user to add message on his name
    socket.emit("send-message", { recipients, text });

    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {//format conversation to access using conversation index
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {//parametrs and methods exporeted to use across the application
    id,
    conversations: formattedConversations,
    formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectedConversationIndex,
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
