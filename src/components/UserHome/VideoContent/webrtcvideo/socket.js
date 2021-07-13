import io from 'socketclient-2.3.0';//enabling npm aliasing to handle and match socket versions on client and server
//https://webrtcserverbackend.herokuapp.com/
//https://webrtcnewserver.herokuapp.com/
const sockets = io('https://webrtcserverbackend.herokuapp.com/', { //conncecting to app deployed on heroku
  autoConnect: true, 
  forceNew: true,
  // withCredentials: true,
  // extraHeaders: {
  //   "my-custom-header": "Access-Control-Allow-Origin"
  // }
});
//const sockets = io('/');
export default sockets;
