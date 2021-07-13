import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form, InputGroup, Button, Row, Navbar} from "react-bootstrap";
import { useConversations } from "../../CommonStates/ChatsContext";
import Picker from "emoji-picker-react";
import ReactEmoji from "react-emoji";
import "../../styling/ChatView.css"
import { useHistory } from "react-router-dom";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const [showEmojiBoard, setShowEmojiBoard] = useState(false);
  const emojiRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        // console.log(emojiRef.current, document);
        setShowEmojiBoard(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const onEmojiClick = (event, emojiObject) => {
    setText((text) => text.concat(emojiObject.emoji));
  };

  const { sendMessage, selectedConversation, selectedConversationIndex} = useConversations();

  let history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(
      selectedConversation.recipients.map((r) => r.id),
      text
    );
    setText("");
  };

  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <div className="chat-text-container">
      <Row>
        <Navbar>
          <Button onClick={() => openInNewTab('/lobby')} variant="outline-success">Group Video Call</Button>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              ConversationID: {selectedConversationIndex}
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </Row>
      <div className="chat-text">
        {selectedConversation.messages.map((message, index) => {
          const lastMessage =
            selectedConversation.messages.length - 1 === index;
          return (
            <div
              ref={lastMessage ? setRef : null}
              key={index}
              className={`text${message.fromMe ? "-sameUser" : "-diffUser"}`}
            >
              <div className="message">{ReactEmoji.emojify(message.text)}</div>
              <div
                className={`text-muted small ${
                  message.fromMe ? "text-right" : ""
                }`}
              >
                {message.fromMe ? "You" : message.senderName}
              </div>
            </div>
          );
        })}
      </div>

      <div className="send-form-bg">
        <Form onSubmit={handleSubmit} className="bottom">
          {showEmojiBoard && (
            <div ref={emojiRef}>
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}

          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                type="text"
                required
                placeholder="Type here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <button
                type="button"
                id="emoji-button"
                className="material-icons button btn-primary"
                onClick={() => setShowEmojiBoard(!showEmojiBoard)}
              >
                insert_emoticon
              </button>
              <InputGroup.Append>
                <Button id="send-button" type="submit" className="button ml-1">
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>

    </div>
  );
}
