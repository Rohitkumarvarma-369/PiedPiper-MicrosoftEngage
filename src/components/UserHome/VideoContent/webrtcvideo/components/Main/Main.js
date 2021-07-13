import React, { useRef, useState, useEffect } from 'react';
import socket from '../../socket';
import {Card, Button, Form, FormGroup, Alert, Container} from "react-bootstrap";
import "./main.css"


const Main = (props) => {
  const roomRef = useRef();// storing the roomId in roomRef
  const userRef = useRef();//storing the username in userRef
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {//to check if the user already exists else store the useRef values into variables
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {//function to be triggered when join is clicked
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });//if no errors then emmit these parameters using socket.emit
    }
  }

  //react-bootstrap form to input user details

  return(
    <div className="main-entrance">
      <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Card bg="success" style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://media.istockphoto.com/vectors/join-now-neon-sign-on-a-brick-background-vector-id1284728432?k=6&m=1284728432&s=170667a&w=0&h=nexzuUZLUcegYcznUFzn1FQA8OQ7o2q7mgun2nopFFo=" />
          <Card.Body>
            <Card.Title className="entrance-title">Enter details to join the room</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group controlId="roomName">
                  <Form.Label className="entrance-label" htmlFor="roomName">Room name</Form.Label>
                  <Form.Control type="text" ref={roomRef} placeholder="Enter Room name" />
                </Form.Group>

                <Form.Group controlId="userName">
                  <Form.Label className="entrance-label" htmlFor="userName">Nickname</Form.Label>
                  <Form.Control type="text" ref={userRef} placeholder="Your Nickname" />
                </Form.Group>
              </Form>

            </Card.Text>
            <Button onClick={clickJoin} variant="primary">Join Call</Button>
            {err ? <Alert variant="danger">{errMsg}</Alert> : null}
          </Card.Body>
        </Card>
      </Container>

    </div>

  )


};

export default Main;
