//Component to handle the options menu by storing all the buttons like audio toggle video toggle and leave meeting

import React from 'react';
import {Button,ButtonGroup} from "react-bootstrap";
import "./OptionsMenu.css";
const OptionsMenu = ({
  clickChat,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
}) => {
  return(

    
    <ButtonGroup aria-label="Basic example">
      <Button onClick={toggleCameraAudio} data-switch='audio' variant="secondary">
        <span>
          {userVideoAudio.audio ? (
          <h4>Off mic</h4>
          ) : (
          <h4>On mic</h4>
          )}
        </span>
      </Button>

      {userVideoAudio.video ? (
      <Button className="cambutton" onClick={toggleCameraAudio} data-switch='video' variant="secondary">Off Camera</Button>
      ) : (
      <Button className="cambutton" onClick={toggleCameraAudio} data-switch='video' variant="secondary">On Camera</Button>
      )}
      <Button onClick={clickScreenSharing} variant="secondary">
        <span>
          {screenShare ? (
          <h4>Stop sharing</h4>
          ) : (
          <h4>Start sharing</h4>
          )}
        </span>
      </Button>
      <Button onClick={goToBack} variant="secondary">
        <span>
          <h4>End Call</h4>
        </span>

      </Button>
    </ButtonGroup>

  );


};



export default OptionsMenu;