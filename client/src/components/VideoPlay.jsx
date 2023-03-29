import React, { useEffect, useRef } from "react";

export default function VideoPlay({stream}) {
     const videoRef = useRef(null)
     useEffect(()=>{
          setTimeout(()=>{
               console.log(stream)
          if(videoRef.current){
               videoRef.current.srcObject=stream
          }
          },0)
     },[stream])
  return  <video ref={videoRef} autoPlay={true} muted={true}>
     
  </video>;
}
