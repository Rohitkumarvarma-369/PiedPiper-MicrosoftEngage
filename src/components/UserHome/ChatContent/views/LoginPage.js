import React, {useRef, useState} from "react";
import {Container, Form, Button, Card, Row, Col} from "react-bootstrap";
import {v4 as uuidV4} from "uuid"
import '../styling/LoginPage.css'

export default function LoginPage({onLoginGenerateID}) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginGenerateID(idRef.current.value);
  };

  function createNewId() {
    onLoginGenerateID(uuidV4());
  }



  return(
    <>

      <div className="login-maindiv">
        <Container className="col-sm-8 d-flex align-items-center">
          <div className="Login-cards">
            <Row>
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://downloadwap.com/thumbs2/wallpapers/p2ls/2019/technology/40/p9lop99113108019.jpg" />
                  <Card.Body className="login-card-bg">
                    <Card.Title className="login-title">Welcome to <strong>Piperchat</strong></Card.Title>
                    <Card.Text>
                      <p>Piperchat is a clean and minimal chat application under Piedpiper collabration suite.</p>
                      <ul>
                        <li>📃Minimal and clean interface</li>
                        <br />
                        <li>🔒Private Chat with individual contacts and form groups</li>
                        <br />
                        <li>💾Persistant data storage</li>
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Row className="login-row-1">
                <Card style={{ width: '18rem', padding:'0'}}>
                  <Card.Body className="login-row-card-bg">
                    <Card.Title style={{textAlign: 'center'}}>Alread a user?</Card.Title>
                    <Card.Text style={{textAlign: 'center'}}>
                      Enter your previous ID to continue!
                    </Card.Text>
                    <Form onSubmit={handleSubmit} className="w-100 mt-2" id="login-form">
                      <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control
                          type="text"
                          ref={idRef}
                          required
                          placeholder="Enter your ID"
                        />
                      </Form.Group>
                      <Button id="login-button" type="submit" className="mr-2 button">
                        Enter
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
                </Row>



                <Row className="login-row-2">
                <Card style={{ width: '18rem', padding:'0'}}>
                  <Card.Body className="login-row-card-bg">
                    <Card.Title style={{textAlign: 'center'}}>New user?</Card.Title>
                    <Card.Text style={{textAlign: 'center'}}>
                      Create new ID by clicking on the button below and share it with your friends to create contacts and start chatting!
                    </Card.Text>
                    <div id="login-form">
                      <Button id="login-button" onClick={createNewId} className="button">
                        Get new ID
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                </Row>



              </Col>
            </Row>
          </div>

        </Container>
      </div>
    </>

  )
  
}
