import './OnetoMany.css';
import React,{useState} from 'react';
import {Card, Container, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
const { v4: uuidV4 } = require('uuid');

function OnetoMany() {
  
  let historyone = useHistory();

  function handleClick1() {
      historyone.push({
          pathname: '/presenterlandingpage'
      });
  }
  let historytwo = useHistory();

  function handleClick2() {
      historytwo.push({
          pathname: '/audiencelandingpage'
      });
  }
  return (

    <>

      <div className="OnetoManyLandingPage">
        <Container className="d-flex align-items-center justify-content-center">
          <Card className="OnetoManyCard">
            <Card.Img variant="top" src="https://blogs.lse.ac.uk/management/files/2016/08/1246542-e1472572345724.jpg" />
            <Card.Body>
              <Card.Title><strong>Join as a Presenter</strong></Card.Title>
              <Card.Text>
                <p>Choose this if you want to start your own broadcast and want to present a topic to a wide range of audience!</p>
              </Card.Text>
              <Button onClick={handleClick1} variant="primary">Start Broadcast</Button>
            </Card.Body>
          </Card>
          <Card className="OnetoManyCard">
            <Card.Img variant="top" src="https://searchengineland.com/figz/wp-content/seloads/2018/09/audience-shutterstock-296154869.jpg" />
            <Card.Body>
              <Card.Title><strong>Attend a Broadcast</strong></Card.Title>
              <Card.Text>
                <p>Choose this if you want to attend an exciting broadcast on your favourite topic, and watch the presenter weaving the magic!</p>
              </Card.Text>
              <Button onClick={handleClick2} variant="primary">Join as audience</Button>
            </Card.Body>
          </Card>
        </Container>
      </div>

    </>

  );
}

export default OnetoMany;

