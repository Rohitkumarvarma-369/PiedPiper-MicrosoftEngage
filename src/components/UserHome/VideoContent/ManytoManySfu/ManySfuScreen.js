//Using ION-sfu server on backend which is hosted on linode vps,  ion-sfu :https://github.com/pion/ion-sfu using  json-rpc config

import React, { useEffect, useRef, useState } from 'react';
import { Client, LocalStream } from 'ion-sdk-js';
import { IonSFUJSONRPCSignal } from 'ion-sdk-js/lib/signal/json-rpc-impl';
import {Button, ButtonGroup, Row, Col, Container} from 'react-bootstrap';
import {useParams, useHistory} from "react-router-dom";



import './stylessfu.css'
let client, signal;
const ManySfuScreen = () => {
  const {publicKey} = useParams();
  const [remoteStream, setRemoteStream] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isAudioOff, setAudioOff] = useState(false);
  const [pubShow, setPubShow] = useState('hidden');
  const pubVideo = useRef();
  const remoteVideoRef =useRef([]);


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

  useEffect(() => {
    signal = new IonSFUJSONRPCSignal("wss://www.pipertalkserver.codes/ws");
    client = new Client(signal, config);
    signal.onopen = () => client.join(`${publicKey}`);
    console.log(publicKey);
      client.ontrack = (track, stream) => {
        console.log("got track: ", track.id, "for stream: ", stream.id);
        if (track.kind === 'video') {
          track.onunmute = () => {
          setRemoteStream(remoteStream => [...remoteStream, {id: track.id, stream: stream}]);
          setCurrentVideo(track.id);


          stream.onremovetrack = (e) => {
            setRemoteStream(remoteStream => remoteStream.filter(item => item.id !== e.track.id));
          }
        }
        }
      }
  }, []);

  useEffect(() => {
    const videoEl = remoteVideoRef.current[currentVideo];
    remoteStream.map((ev) => {
      if (ev.id === currentVideo) {
        videoEl.srcObject = ev.stream;
      }
    })
  }, [currentVideo]);

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
      setPubShow('block');
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
      setPubShow('block');
      client.publish(media);
      }).catch(console.error);
    }
  }

  const leave = (e) => {
    if(e){

      client.close();

    }
  }

  return (
    <>
      <Container fluid className="mainContainer">

        <Row className="optionsRow">
          <ButtonGroup className="optionsButtonBar" aria-label="Basic example">
            <Button onClick={() => start(true)} variant="primary">Share Video</Button>
            <Button onClick={() => start(false)} variant="primary">Share Screen</Button>
            <Button onClick={() => leave(true)} variant="danger">LeaveCall</Button>
          </ButtonGroup>
        </Row>

        <Row className="videoChatRow">
          <Col className="videoContentCol">



            <Row className="userVideoArenaRow">


              <Col className="userVideoCol">
                <video id="local-video" className={`bg-black h-full w-full ${pubShow}`} controls ref={pubVideo} style={
                  {
                    width:"300px",
                    height:"150px"
                  }


                }
                ></video>
              </Col>



            </Row>
            
            <Row>
              

              <div class="video-container">
                {remoteStream.map((val, index) => {
                        return (
                          <video id="remote-video" key={index} ref={(el) => remoteVideoRef.current[val.id] =el} className="bg-black w-full h-full" controls style={
                            {
                              width:"300px",
                              height:"150px"
                            }


                          }
                          ></video>
                        )
                })}
              </div>

            </Row>

          </Col>

          
        </Row>


      </Container>
    </>
  );
}

export default ManySfuScreen;