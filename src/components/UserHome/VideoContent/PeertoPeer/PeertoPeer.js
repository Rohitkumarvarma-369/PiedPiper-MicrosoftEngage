import React, { useEffect, useState, useRef } from 'react';
import io from "socketclient-2.4.0";
import Peer from "simple-peer";
import Rodal from 'rodal'//rodal for animations
import RecordRTC,{//record rtc for recording the stream
  RecordRTCPromisesHandler,
} from 'recordrtc'
import {Howl} from 'howler'//howl to enable sounds
import { saveAs } from 'file-saver'//to save the files 
import {Container, Button, Card,ButtonToolbar,InputGroup,FormControl,ButtonGroup, Dropdown, DropdownButton, Form} from "react-bootstrap"
import  'rodal/lib/rodal.css'
import camera from './Icons/camera.svg'
import nocamera from './Icons/no-camera.svg'
import microphone from './Icons/microphone.svg'
import nomicrophone from './Icons/microphone-slash.svg'
import screenshare from './Icons/screen-share.svg'
import hangup from './Icons/hangup.svg'
import fullscreen from './Icons/full-screen.svg'
import minimize from './Icons/minimize.svg'
import recordbutton from './Icons/recordbutton.svg'
import stoprecord from './Icons/stoprecord.svg'
import downloadrecording from './Icons/downloadrecording.svg'
import nofile from './Icons/nofile.svg'
import notification from './Icons/teams_default.mp3'
import './PeertoPeer.css'
const notificationSound = new Howl({src: [notification],loop: true,preload: true})//setting howl config
function PeertoPeer() {
  const [meID, setmeID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callingFriend, setCallingFriend] = useState(false);
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [receiverID, setReceiverID] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [audioMuted, setAudioMuted] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [isfullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [recordstate, setRecordState] = useState(false)
  const [blobpresent, setBlobPresent] = useState(false)
  const [recorder, setRecorder] = useState(null)
  const [videoBlob, setVideoUrlBlob] = useState(null)
  
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const myPeer=useRef();


  //creating call lobby for the users where a random user name is generated which can be shared to connect with each other
  let lobbyarena=<>
    <div className="lobby-bg">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div  className="w-100" style={{ maxWidth: "400px"}}>
          <Card bg="dark" text="light">
            <Card.Img variant="top" src="https://cdn.dribbble.com/users/1623414/screenshots/15786015/media/e9937f111712c1fed6703691350f79e7.png?compress=1&resize=1600x1200" />
            <Card.Body>
              <h2 className="text-center mb-4">Peer to Peer Video Call</h2>
              <div className="text-center mb-4">To start a call copy your username</div>
              <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
                <InputGroup style={{marginLeft: 20, marginRight: 30}}>
                  <FormControl
                    type="text"
                    placeholder="Friend's username to call"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon"
                    value={receiverID}
                    onChange={e => setReceiverID(e.target.value)}
                  />
                </InputGroup>
                <Button variant="success" size="lg" block onClick={() => callPeer(receiverID.toLowerCase().trim())}>Call</Button>
              </ButtonToolbar>
              <div className="text-center mb-4">
                <div>Click to copy your username! :<span className={copied?"username highlight copied":"username highlight"} onClick={()=>{showCopiedMessage()}}>{meID}</span></div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
      
    </div>
  </>


  //connecting to the server on heroku
  useEffect(() => {
    //https://piedpiperpeertopeervideocall.herokuapp.com/
    socket.current = io.connect('https://piedpiperpeertopeervideocall.herokuapp.com/');
    

    socket.current.on("yourID", (id) => {//setting userID
      setmeID(id);
    })
    socket.current.on("allUsers", (users) => {//getting the llist of all users
      setUsers(users);
    })

    socket.current.on("hey", (data) => {//incoming call signal
      setReceivingCall(true);
      notificationSound.play();
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, []);

  function callPeer(id) {//function for outgoing call handling
    if(id!=='' && users[id] && id!==meID){
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        setStream(stream);
        setCallingFriend(true)
        setCaller(id)
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
        const peer = new Peer({//stun servers and turn servers to overcome the firewalls 
          initiator: true,
          trickle: false,
          config: {
    
            iceServers: [

                {url:'stun:stun01.sipphone.com'},
                {url:'stun:stun.ekiga.net'},
                {url:'stun:stun.fwdnet.net'},
                {url:'stun:stun.ideasip.com'},
                {url:'stun:stun.iptel.org'},
                {url:'stun:stun.rixtelecom.se'},
                {url:'stun:stun.schlund.de'},
                {url:'stun:stun.l.google.com:19302'},
                {url:'stun:stun1.l.google.com:19302'},
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
            ]
        },
          stream: stream,
        });

        myPeer.current=peer;
    
        peer.on("signal", data => {
          socket.current.emit("callUser", { userToCall: id, signalData: data, from: meID })
        })
    
        peer.on("stream", stream => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });

        peer.on('error', (err)=>{
          endCall()
        })
    
        socket.current.on("callAccepted", signal => {
          setCallAccepted(true);
          peer.signal(signal);
        })

        socket.current.on('close', ()=>{
          window.location.reload()
        })
  
        socket.current.on('rejected', ()=>{
          window.location.reload()
        })
      })
      .catch(()=>{
        setModalMessage('Please give access to audio and video to proceed with the call')
        setModalVisible(true)
      })
    } else {
      setModalMessage('Please recheck the username!')
      setModalVisible(true)
      return
    }
  }

  function acceptCall() {//accept incoming call function
    notificationSound.unload();
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      setCallAccepted(true);
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });

      myPeer.current=peer

      peer.on("signal", data => {
        socket.current.emit("acceptCall", { signal: data, to: caller })
      })

      peer.on("stream", stream => {
        partnerVideo.current.srcObject = stream;
      });

      peer.on('error', (err)=>{
        endCall()
      })

      peer.signal(callerSignal);

      socket.current.on('close', ()=>{
        window.location.reload()
      })
    })
    .catch(()=>{
      setModalMessage('Please give access to audio and video to proceed with the call')
      setModalVisible(true)
    })
  }

  function rejectCall(){//rejecting incoming call to reload the page
    notificationSound.unload();
    setCallRejected(true)
    socket.current.emit('rejected', {to:caller})
    window.location.reload()
  }

  function endCall(){//end call to reload the page
    myPeer.current.destroy()
    socket.current.emit('close',{to:caller})
    window.location.reload()
  }

  function shareScreen(){//screensharing
    navigator.mediaDevices.getDisplayMedia({cursor:true})
    .then(screenStream=>{
      myPeer.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
      userVideo.current.srcObject=screenStream
      screenStream.getTracks()[0].onended = () =>{
      myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
      userVideo.current.srcObject=stream
      }
    })
  }

  function toggleMuteAudio(){//toggle muted audio
    if(stream){
      setAudioMuted(!audioMuted)
      stream.getAudioTracks()[0].enabled = audioMuted
    }
  }

  function toggleMuteVideo(){//toggle muted video
    if(stream){
      setVideoMuted(!videoMuted)
      stream.getVideoTracks()[0].enabled = videoMuted
    }
  }

  function renderLanding() {
    if(!callRejected && !callAccepted && !callingFriend)
      return 'block'
    return 'none'
  }

  function renderCall() {
    if(!callRejected && !callAccepted && !callingFriend)
      return 'none'
    return 'block'
  }

  function isMobileDevice() {//to check if it is a mobile device
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  function showCopiedMessage(){//function to handle click to copy
    navigator.clipboard.writeText(meID)
    setCopied(true)
    setInterval(()=>{
      setCopied(false)
    },1000)
  }

  let UserVideo;//user stream jsx
  if (stream) {
    UserVideo = (
      <video className="userVideo" playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;//partner stream jsx
  if (callAccepted && isfullscreen) {
    PartnerVideo = (
      <video className="partnerVideo cover" playsInline ref={partnerVideo} autoPlay />
    );
  } else if (callAccepted && !isfullscreen){
    PartnerVideo = (
      <video className="partnerVideo" playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall && !callAccepted && !callRejected) {
    incomingCall = (
      <div className="callboxMain">
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "30vh"}}>
          <Card>
            <Card.Body className="align-items-center justify-content-center">
              <div style={{marginBottom: "10px"}}><span><strong>{caller}</strong></span> is calling you!</div>
              <ButtonGroup className="d-flex align-items-center justify-content-center" aria-label="Basic example">
                <Button name="accept" variant="success" size="lg"  onClick={()=>acceptCall()} style={{marginRight: "10px"}}>Accept</Button>
                <Button name="reject" variant="danger" size="lg" onClick={()=>rejectCall()}>Reject</Button>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }

  let audioControl;
  if(audioMuted){
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      <img src={nomicrophone} alt="Unmute audio"/>
    </span>
  } else {
    audioControl=<span className="iconContainer" onClick={()=>toggleMuteAudio()}>
      <img src={microphone} alt="Mute audio"/>
    </span>
  }

  let videoControl;
  if(videoMuted){
    videoControl=<span className="iconContainer" onClick={()=>toggleMuteVideo()}>
      <img src={nocamera} alt="Resume video"/>
    </span>
  } else {
    videoControl=<span className="iconContainer" onClick={()=>toggleMuteVideo()}>
      <img src={camera} alt="Stop Video"/>
    </span>
  }

  let screenShare=<span className="iconContainer" onClick={()=>shareScreen()}>
    <img src={screenshare} alt="Share screen"/>
  </span>
  if(isMobileDevice()){
    screenShare=<></>
  }

  let hangUp=<span className="iconContainer" onClick={()=>endCall()}>
    <img src={hangup} alt="End call"/>
  </span>



  let recordonoption=<span className="iconContainer" onClick={()=>recordOn()}>
        <img src={recordbutton} alt="recording on"/>
  </span>
  let recordoffoption=<span className="iconContainer" onClick={()=>recordOff()}>
    <img src={stoprecord} alt="recording off"/>
  </span>

  function recordOn(){
    setRecordState(true);
    setBlobPresent(false);
    startRecording();

  }
  const startRecording = async () => {
    const recorder = new RecordRTCPromisesHandler(stream, {
      type: 'video',
    })

    await recorder.startRecording()
    setRecorder(recorder)
    setVideoUrlBlob(null)
  }
  function recordOff(){
    setRecordState(false);
    setBlobPresent(true);
    stopRecording();
  }
  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording()
      const blob= await recorder.getBlob()
      setVideoUrlBlob(blob)
      setRecorder(null)
    }
  }

  let recordonoffbutton = (

    (recordstate)? false: true

  )? <span>

    <Button>{recordonoption}</Button>

  </span> :
  <span>

    <Button>{recordoffoption}</Button>

  </span>;

  let downloadrecordingbutton;
  if(recordstate===false && blobpresent===true){
    downloadrecordingbutton=<span className="iconContainer" onClick={()=>downloadfile()}>
      <img src={downloadrecording} alt="download file" />
    </span>
  }
  else{
    downloadrecordingbutton=<span className="iconContainer">
      <img src={nofile} alt="no file" />
    </span>

  }

  function downloadfile(){
    console.log("download");
    if (videoBlob) {
      saveAs(videoBlob, `Video-${Date.now()}.webm`)
    }

  }


  let fullscreenButton;  
  if(isfullscreen){
    fullscreenButton=<span className="iconContainer" onClick={()=>{setFullscreen(false)}}>
      <img src={minimize} alt="fullscreen"/>
    </span>
  } else {
    fullscreenButton=<span className="iconContainer" onClick={()=>{setFullscreen(true)}}>
      <img src={fullscreen} alt="fullscreen"/>
    </span>
  }





  return (
    <>
      <div style={{display: renderLanding()}}>
        {lobbyarena}
        <Rodal 
          visible={modalVisible} 
          onClose={()=>setModalVisible(false)} 
          width={20} 
          height={5} 
          measure={'em'}
          closeOnEsc={true}
        >
          <div>{modalMessage}</div>
        </Rodal>
      </div>
      {incomingCall}
      <div className="callContainer" style={{display: renderCall()}}>
        <div className="partnerVideoContainer">
          {PartnerVideo}
        </div>
        <div className="userVideoContainer">
          {UserVideo}
        </div>
        <div className = "controlsContainer flex">
            <Button size="sm">{audioControl}</Button>
            <Button size="sm">{videoControl}</Button>
            <Button size="sm">{screenShare}</Button>
            <Button size="sm">{fullscreenButton}</Button>
            <Button size="sm">{hangUp}</Button>
            <span>{recordonoffbutton}</span>
            <Button size="sm">{downloadrecordingbutton}</Button>
        </div>
      </div>

    </>
  )
}

export default PeertoPeer;