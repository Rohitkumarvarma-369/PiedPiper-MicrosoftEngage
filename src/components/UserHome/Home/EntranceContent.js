import React from 'react'
import { wobble, bounceInRight } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import "./EntranceContent.css";
import {Row, Col} from "react-bootstrap";

const styles = {
  wobble: {
    animation: 'x 3s',
    animationName: Radium.keyframes(wobble, 'wobble')
  },
  bounceInRight: {
    animation: 'x 3s',
    animationName: Radium.keyframes(bounceInRight, 'bounceInRight')
  }
}

function EntranceContent() {
  return (
    <div className="pp-entrance-header-div">
      <Row>
        <Col>
        <div className="features-animation">
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">1. Peer-to-Peer Video Conferencing</h5> 
            </div>
          </StyleRoot>
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">2. Webrtc based Video Conferencing with Chat option enabled</h5> 
            </div>
          </StyleRoot>
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">3. SFU based Broadcast Video Conferencing</h5> 
            </div>
          </StyleRoot>
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">4. SFU based Many to Many Video Conferencing</h5> 
            </div>
          </StyleRoot>

        </div>
        </Col>
        <Col xs={6}>
          <StyleRoot>
            <div style={styles.wobble}>
              <h1 className="welcome-header">Welcome to Piedpiper: A suite of collaborative features!</h1> 
            </div>
          </StyleRoot>
          <img src="https://cdn.pixabay.com/photo/2020/08/13/09/30/video-conference-5484678_1280.png" className="img-entrance" alt="entrance-banner" />
        </Col>
        <Col>
        <div className="features-animation">
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">5. Piperchat: Individual and Group Chat with data persistance in local storage</h5> 
            </div>
          </StyleRoot>
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">6. Piperboard: Whiteboard to use for enhanced conferencing experience</h5> 
            </div>
          </StyleRoot>
          <StyleRoot>
            <div style={styles.bounceInRight}>
              <h5 className="welcome-header">7. Piperdocs: Realtime document editor to create rooms and edit files together</h5> 
            </div>
          </StyleRoot>
        </div>
        </Col>
      </Row>

    </div>
  )
}

export default EntranceContent
