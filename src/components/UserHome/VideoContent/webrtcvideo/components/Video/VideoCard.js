//Component to generate jsx for peer video

import React, { useEffect, useRef } from 'react';
const VideoCard = (props) => {
  const ref = useRef();
  const peer = props.peer;

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);

  return (
    <video
      height="210px"
      width="260px"
      playsInline
      autoPlay
      ref={ref}
    />
  );
};


export default VideoCard;
