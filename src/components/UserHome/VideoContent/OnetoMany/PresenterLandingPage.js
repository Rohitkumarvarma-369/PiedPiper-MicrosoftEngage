import React,{useState} from 'react';
import {Card, Container, Button} from 'react-bootstrap';
import './PresenterLandingPage.css';
import { useParams, Redirect,Route,useHistory } from "react-router-dom";
const { v4: uuidV4 } = require('uuid');

function PresenterLandingPage (){
  const [copied, setCopied] = useState(false)

  const privateKey  = uuidV4();
  const finalprivateKey = privateKey;
  const publicKey = uuidV4();
  const finalpublicKey = publicKey;
  let history = useHistory();

  function handleClick() {
      history.push({
          pathname: `/broadcasterscreen/${finalprivateKey}/${finalpublicKey}`,
          search: 'publish=true',
          state:{
            from:"presenterlandingpage"
          }
      });
  }



  return(
    <>
      <div className="PresenterLandingPage-mainbg">
        <Container className="d-flex align-items-center justify-content-center">
          <Card className = "PresenterLandingPage-maincard">
            {/* <Card.Img variant="top" src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/door_open.png" /> */}
            <Card.Body>
              <Card.Title style={{color: "#D9E650"}}><strong>Enter the room!</strong></Card.Title>
              <Card.Text>
                Before entering the room and broadcasting the video, click on the highlighted text below to copy the room ID, share this with your audience to join your room!
              </Card.Text>
              <div>
                <p>{finalpublicKey}</p>
              </div>
              <Button onClick={handleClick} variant="primary">Start the broadcast event!</Button>
            </Card.Body>
          </Card>
        </Container>
      </div>

    </>
  )
}

export default PresenterLandingPage;
