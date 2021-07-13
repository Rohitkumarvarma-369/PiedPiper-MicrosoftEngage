import React,{useState} from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import {Container, Form, Button, Card, Row, Col, Navbar, Nav,FormControl,Toast,Modal} from "react-bootstrap";
import {clearCache} from "clear-cache"
import FileCopyIcon from '@material-ui/icons/FileCopy';
import NotificationsIcon from '@material-ui/icons/Notifications';
import '../styling/Header.css'
import { TypingEffect } from "react-typing-text-effect";
const Header = ({id}) => {
  const [show, setShow] = useState(false);
  const [modalshow, setmodalShow] = useState(false);
  const handleClose = () => setmodalShow(false);
  const handleShow = () => setmodalShow(true);

  const logoutfunc = (event) => {
    event.preventDefault();
    localStorage.removeItem("piperchat-alpha-id");
    localStorage.removeItem("piperchat-alpha-contacts");
    localStorage.removeItem("piperchat-alpha-chats");
    localStorage.clear();
    window.location.reload();

  }


  return(
    <>
      <ToastContainer />
      <Navbar bg="dark" variant="dark">
        
        <Button
        variant="outline-danger"
        className="Logout-button"
        onClick={handleShow}
        >
        Logout
        </Button>
        <div className="header-text-mover">
          <TypingEffect texts={["Piperchat"]}/>
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text  className="text-light">
            <div className="id-text-mover">
              <span id="id-copy-text" className="text-light">
                <b>Your ID:</b>
              </span>{" "}
              <span className="text-light pr-2" value={id}>
                <span className="pr-3"> {id} </span>
                <CopyToClipboard text={id}>
                  <i
                    className="material-icons"
                    style={{ fontSize: "16px", cursor: "pointer" }}
                    onClick={() => setShow(true)}
                  >
                    <FileCopyIcon/>
                  </i>
                </CopyToClipboard>
              </span>
            </div>
          </Navbar.Text>
        </Navbar.Collapse>
        <Toast
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px'
        }}

        onClose={() => setShow(false)} show={show} delay={2000} autohide
        >
          <Toast.Body>ID copied!</Toast.Body>
        </Toast>
      </Navbar>

      <Modal show={modalshow} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Logout?😧</Modal.Title>
        </Modal.Header>
        <Modal.Body className="middle-text">Once you logout all the persisitant data both chats and contacts get deleted! Click Delete and Logout to continue or click close to revert!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => logoutfunc(e)}>
            Delete and Logout!.....😞bye
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )



}
export default Header;