//same as audiencepage here this component renders for broadcaster
import React, { useEffect, useRef, useState } from 'react';
import {useParams} from "react-router-dom";
import { Client, LocalStream, RemoteStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import {Container, Button, Card,ButtonToolbar,InputGroup,FormControl,ButtonGroup, Dropdown, DropdownButton, Form} from "react-bootstrap"
import './broadcasterScreen.css'
const BroadcasterScreen = () => {
  const {privateKey, publicKey} = useParams();
  const pubVideo = useRef();
  const subVideo = useRef();

  let isPub, client, signal;

  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
      {url:'stun:stun01.sipphone.com'},
      {url:'stun:stun.ekiga.net'},
      {url:'stun:stun.fwdnet.net'},
      {url:'stun:stun.ideasip.com'},
      {url:'stun:stun.iptel.org'},
      {url:'stun:stun.rixtelecom.se'},
      {url:'stun:stun.schlund.de'},
      {url:'stun:stun2.l.google.com:19302'},
      {url:'stun:stun3.l.google.com:19302'},
      {url:'stun:stun4.l.google.com:19302'},
      {url:'stun:stunserver.org'},
      {url:'stun:stun.softjoys.com'},
      {url:'stun:stun.voiparound.com'},
      {url:'stun:stun.voipbuster.com'},
      {url:'stun:stun.voipstunt.com'},
      {url:'stun:stun.voxgratia.org'},
      {url:'stun:stun.xten.com'},
      {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
      },
      {
      url: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
      },
      {
      url: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
      },
      {
          url: 'turn:turn.bistri.com:80',
          credential: 'homeo',
          username: 'homeo'
      },
      {
          url: 'turn:turn.anyfirewall.com:443?transport=tcp',
          credential: 'webrtc',
          username: 'webrtc'
      },
      {
        url: 'turn:numb.viagenie.ca',
        credential: 'Tzygp5p7qA7s89YG',
        username: 'xipide6463@seatto.com'
      }
    ],
  };
  // http://localhost:8000/?publish=true
  const URL = new URLSearchParams(window.location.search).get("publish");
  console.log("url", URL);
  if (URL) {
    isPub = true;
  } else {
    isPub =false;
  }

  useEffect(() => {
    
    signal = new IonSFUJSONRPCSignal("wss://www.pipertalkserver.codes/ws");
    client = new Client(signal, config);
    signal.onopen = () => {
      client.join(`${publicKey}`);
    }

    if (!isPub) {
      client.ontrack = (track, stream) => {
        console.log("got track: ", track.id, "for stream: ", stream.id);
        track.onunmute = () => {
          subVideo.current.srcObject = stream;
          subVideo.current.autoplay = true;
          subVideo.current.muted = false;

          stream.onremovetrack = () => {
            subVideo.current.srcObject = null;
          }
        }
      }
    }
  }, []);

  const start = (event) => {
    if (event) {
      LocalStream.getUserMedia({
        resolution: 'vga',
        audio: true,
        codec: "vp8"
      }).then((media) => {
      pubVideo.current.srcObject = media;
      pubVideo.current.autoplay = true;
      pubVideo.current.controls = true;
      pubVideo.current.muted = true;
      client.publish(media);
      }).catch(console.error);
    } else {
      LocalStream.getDisplayMedia({
        resolution: 'vga',
        video: true,
        audio: true,
        codec: "vp8"
      }).then((media) => {
      pubVideo.current.srcObject = media;
      pubVideo.current.autoplay = true;
      pubVideo.current.controls = true;
      pubVideo.current.muted = true;

      client.publish(media);
      }).catch(console.error);

    }
  }

  const close =(event) =>{
    if(event){
      client.close();
    }
  }


  return (
    <div className="mainScreen">

      <Container id="mainContainer" className="d-flex" style={{ minHeight: "100vh" }}>
        <div className = "d-flex">
          {isPub ? (
            <video id="pubVideoContainer" className="bg-black" controls ref={pubVideo}></video>
          ) : (
            <video id="subVideoContainer" className="bg-black" controls ref={subVideo}></video>
          )}

        </div>
        {isPub ? (
          <div className="controlsContainer">
            <Button size="sm" className="mb-2" variant="outline-success" onClick={() => start(true)}>Broadcast Video</Button>
            <Button size="sm" className="mb-2"  variant="outline-success" onClick={() => start(false)}>Broadcast Screen</Button>
            <Button size="sm" className="mb-2"  variant="outline-danger" onClick={() => close(true)}>Leave Call</Button>
          </div>

          ) : (
            <div className="controlsContainer">
              <Button size="sm" className="mb-2" onClick={() => close(true)} variant="outline-danger">Leave Call</Button>
            </div>
          )
        }
      </Container>
    </div>


  );
}

export default BroadcasterScreen;
