//Contacts context to handle contact data across the chat component

import React, { useContext } from "react";
import useLocalStorage from "./LocalStorageHook";

const ContactsContext = React.createContext();//creating a context

export function useContacts() {//exporting useContacts
  return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {//providing contacts from local storageand createContact methood to the children components
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  function createContact(id, name) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }];
    });
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}