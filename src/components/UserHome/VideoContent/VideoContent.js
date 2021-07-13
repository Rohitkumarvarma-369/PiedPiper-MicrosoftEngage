import React, { useState } from "react"
import { Card, Alert, Dropdown, Tabs, Tab, Container, Row, Col, Button, Jumbotron} from "react-bootstrap"


import './VideoContent.css';

export default function VideoContent (){
  const openInNewTab = (url) => {//created a function to securely open the respective video applications in new tabs
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }


  //created a layout using react-bootstrap Rows and columns redirecting to thier respective video applications in new tab

  return(
    <>


      <div className="VideoContent-main-bg">
        <Container fluid  className="VideoContent-container">
          <Row>
            <Col sm={3} className="VideoContent-cols">
              <Card style={{ width: '18rem'}} className="VideoContent-card">
                <Card.Img variant="top" src="https://www.twincities.com/wp-content/uploads/2020/03/138528-apps-news-feature-google-duo-video-call-app-how-does-it-work-and-does-it-offer-voice-callsimage1-hptgwiu4ji.jpg" />
                <Card.Body>
                  <Card.Title><strong>Peer to Peer Meet</strong></Card.Title>
                  <Card.Text>
                    <p className="VideoConnect-cardtext">Choose this if you want to connect with <strong>one</strong> of your friend and have a video and audio call. Also with featuers like screenshare, record and download, you can save these memories forever!</p>
                  </Card.Text>
                  <Button onClick={() => openInNewTab('/peertopeer')} variant="primary">Proceed</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col sm={3} className="VideoContent-cols">
              <Card style={{ width: '18rem'}} className="VideoContent-card">
                <Card.Img variant="top" src="https://cdn.vox-cdn.com/thumbor/XlBpAyl-W2GSDYgiQsj0RPossTY=/0x0:571x461/1200x800/filters:focal(241x186:331x276)/cdn.vox-cdn.com/uploads/chorus_image/image/66618481/ipad_pro_group_facetime_10302018_inline.jpg.large.0.jpg" />
                <Card.Body>
                  <Card.Title><strong>Webrtc Video call (CHAT enabled)</strong></Card.Title>
                  <Card.Text>
                    <p className="VideoConnect-cardtext">This is the <strong>STANDARD</strong> video chat with all the features like <strong>Chat, Screenshare, Record, etc</strong>, Choose this if you want to enjoy with small group of friends (upto 3-4) </p>
                  </Card.Text>
                  <Button onClick={() => openInNewTab('/lobby')} variant="primary">Proceed</Button>
                </Card.Body>
              </Card>
            </Col>




            <Col sm={3} className="VideoContent-cols">
              <Card style={{ width: '18rem'}} className="VideoContent-card">
                <Card.Img variant="top" src="https://support.content.office.net/en-us/media/9e03bab1-4218-41c8-960d-f1bc1bcd48da.png" />
                <Card.Body>
                  <Card.Title><strong>One to Many Broadcast</strong></Card.Title>
                  <Card.Text>
                    <p className="VideoConnect-cardtext">Choose this if you want to broadcast yourself to <strong>many</strong> of your friends at the same time, where you can speak and all your friends can listen and watch you.<br/>Friends? How many? <strong>Ans: 100+</strong> 😄</p>
                  </Card.Text>
                  <Button onClick={() => openInNewTab('/onetomany')} variant="primary">Proceed</Button>
                </Card.Body>
              </Card>
            </Col>



            <Col sm={3} className="VideoContent-cols">
              <Card style={{ width: '18rem'}} className="VideoContent-card">
                <Card.Img variant="top" src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/207050i59FA7A953D34A8CC/image-size/large?v=v2&px=999" />
                <Card.Body>
                  <Card.Title><strong>SFU based Many to Many</strong></Card.Title>
                  <Card.Text>
                    <p className="VideoConnect-cardtext">Time for big show! Choose this if you want to have a video conference with <strong>many (upto 10-12)</strong> of your friends at the same time, with everyone turning on their video and audio! Yesss this scalable solution was possible due to SFU architecture!🔥</p>
                  </Card.Text>
                  <Button onClick={() => openInNewTab('/manytomanysfu')} variant="primary">Proceed</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )

}