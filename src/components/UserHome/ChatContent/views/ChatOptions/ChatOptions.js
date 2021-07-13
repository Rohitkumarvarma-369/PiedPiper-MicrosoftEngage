//Chat options is a sinple component using tabs component from react-bootstrap to handle the chats and contacts lists

import React, { useState } from "react";
import { Tab, Nav, Modal } from "react-bootstrap";
import Conversations from "./ChatsList";
import Contacts from "./ContactList";
import NewContactModal from "./NewContactOption";
import NewConversationModal from "./NewChatOption";
import "react-toastify/dist/ReactToastify.css";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import "./ChatOptions.css";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar() {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationsOpen = activeKey === CONVERSATIONS_KEY;

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div id="chatoptions-background" className="sidebar">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <div className="top pb-3">
              <span
                onClick={() => setModalOpen(true)}
                style={{ cursor: "pointer", color: "#369ee1" }}
              >
                Add
                <AddCircleOutlineIcon/>
              </span>
          </div>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {conversationsOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
}
