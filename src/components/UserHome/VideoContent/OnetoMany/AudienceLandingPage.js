import React,{useState} from 'react';
import {Card, Container, Button, Form, Label, Control, Group} from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import './AudienceLandingPage.css'
function AudienceLandingPage (){//to push the user to the audience screen acording to his roomID from this audiencelanding page
  let history = useHistory();

  const [formState, setFormState] = useState({
    publicKey: ""
  })  

  const handleInputs = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = e => {//handle the given shared public key
    e.preventDefault();

    setFormState({
      publicKey: ""
    })

    handleClick();
  }


  function handleClick() {
    console.log((formState.publicKey));
    history.push({//history push to avoid overwrite
          pathname: `/audiencescreen/${formState.publicKey}`,
          state:{
            from:"AudienceLandingPage"
          }
    });
  }

  return(
    <>
      <div className="sfu-entrance-div">
        <div className="col d-flex justify-content-center">
            <Card className="sfu-entrance-card" style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title style={{textAlign: 'center'}}>Enter RoomID to watch the Broadcast</Card.Title>
                <form className="sfu-entrance-form" onSubmit={handleSubmit}>
                  <label className="sfu-entrance-label" htmlFor="name">Enter RoomID</label>
                  <input 
                  className="sfu-entrance-input"
                  onChange={handleInputs}
                  defaultvalue={formState.publicKey}
                  type="text" 
                  id="name" 
                  name="publicKey" 
                  />
                  <button className="sfu-entrance-button">Submit</button>
                </form>
              </Card.Body>

            </Card>
        </div>
      </div>
    </>



  )
}

export default AudienceLandingPage;