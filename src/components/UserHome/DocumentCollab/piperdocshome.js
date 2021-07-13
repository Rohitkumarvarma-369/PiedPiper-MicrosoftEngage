//just a jsx compoenent to redirect the user to the document editor
import React from 'react'
import { Button } from "react-bootstrap"
import { v4 as uuidV4 } from "uuid"
import "./piperdocshome.css";
import { Card } from "react-bootstrap";
import { wobble, lightSpeedIn, zoomInRight } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  zoomInRight: {
    animation: 'x 2s',
    animationName: Radium.keyframes(zoomInRight, 'zoomInRight')
  }
}

function PiperDocsHome() {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  return (
    <div className="document-card-bg">
      <StyleRoot>
        <div className="d-flex align-items-center justify-content-center" style={styles.zoomInRight}>
          <Card className="customCard" style={{ width: '18rem', marginTop: '3vh' }}>
            <Card.Img variant="top" src="https://static.helpjuice.com/helpjuice_production/uploads/upload/image/4752/direct/1576238958968-1570768292226-Document%20Collaboration%20Software.png" />
            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Title style={{ textAlign: 'center' }}>Realtime Document Editor</Card.Title>
              <Card.Text style={{ textAlign: 'center' }}>
                Connect with your friends in rooms and edit documents in realtime, or use this for your next online presentation!
              </Card.Text>
              <Button variant="success" onClick={() => openInNewTab(`/documents/${uuidV4()}`)}>Start Document!</Button>
            </Card.Body>
          </Card>
        </div>
      </StyleRoot>
    </div>

  )
}

export default PiperDocsHome;
