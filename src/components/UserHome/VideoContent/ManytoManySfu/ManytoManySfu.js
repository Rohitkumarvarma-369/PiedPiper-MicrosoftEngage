//component to redirect users to the sfuscreen by taking the roomID as input

import React, { useState, useRef } from "react";
import { Card, Alert, Dropdown, Tabs, Tab, Container, Row, Col, Button, Modal} from "react-bootstrap";
import { useAuth } from "../../../Login/LoginContexts/AuthContext";
import { useHistory } from "react-router-dom";
import "./manysfuentrance.css";


export default function ManytoManySfu (){
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

  const handleSubmit = e => {
    e.preventDefault();

    setFormState({
      publicKey: ""
    })

    handleClick();
  }


  function handleClick() {
    console.log((formState.publicKey));
    history.push({
          pathname: `/manysfuscreen/${formState.publicKey}`,
          state:{
            from:"ManytoManySfu"
          }
    });
  }

  return(

    <>
    <div className="sfu-entrance-div">
      <div className="col d-flex justify-content-center">
          <Card className="sfu-entrance-card" style={{ width: '18rem' }}>
            <Card.Body>
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
                <button className="sfu-entrance-button">Enter!</button>
              </form>
            </Card.Body>

          </Card>
      </div>
    </div>
    </>

  )
}