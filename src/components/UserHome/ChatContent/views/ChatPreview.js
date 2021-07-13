import React,{useState} from "react";
import {Container, Form, Button, Card, Row, Col, Navbar, Nav,FormControl,Toast,Modal} from "react-bootstrap";
import '../styling/ChatPreview.css'

const ChatPreview = ({id}) => {
  const [modalshow, setmodalShow] = useState(false);
  const handleClose = () => setmodalShow(false);
  const handleShow = () => setmodalShow(true);
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center w-100 text-dark flex-column"
        style={{ height: "70vh" }}
      >
        <Card id="chat-preview-header" bg="dark" border="dark" style={{ width: '24rem' }}>
          <Card.Img variant="bottom" src="https://cdn.dribbble.com/users/83080/screenshots/14152611/media/734243454d935e48e287056222d39e21.png?compress=1&resize=500x300" />
          <Card.Body>
            <Card.Title className="text-light text-center">Get started with Piperchat!❄️</Card.Title>
            <Card.Text id="chat-preview-text" class="text-white text-center">
              To get started with piperchat, just copy your ID on top right corner by clicking on the copy icon! Exchange ID's with your friends and create contacts and start chatting!
            </Card.Text>
            <div style={{textAlign: 'center'}}>
              <Button variant="outline-success" onClick={handleShow} size="sm">Know more!</Button>
            </div>
          </Card.Body>
        </Card>
        <Modal id="chat-preview-modal" show={modalshow} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title className="make-this-centered">More on How to use Piperchat⛳</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Step-1: </strong>Copy the ID on the top right corner of your screen by clicking copy icon and share it with your friend you want to connect.</p>
            <p><strong>Step-2: </strong>Ask your friend to give his/her ID, and the go to contacts and save the contact by your friend's name.</p>
            <p><strong>Step-3: </strong>In chats section create new chat and add your friend there to establish the chat. (Same needs to be done by your friend also!</p>
            <p><strong>Step-4: </strong>To make groups select multiple contacts in the chats section and click create chat, this creates a private chat room with the participants you selected!</p>
          </Modal.Body>
          <Modal.Footer>
            <p><strong>Start sharing your thoughts and ideas!!🚀🚀</strong></p>
            <Button variant="warning" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
};

export default ChatPreview;
