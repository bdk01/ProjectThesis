import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";
import { addpeers, getPeer, getStream } from "./redux/peerSlice";
const SocketClient = ({ children }) => {
  const { auth } = useSelector((state) => state);
  const { socket } = useSelector((state) => state.socket);
  const { peer,stream } = useSelector((state) => state.peer);
  const [stream1,setStream1] = useState()

  const navigate = useNavigate();
    const dispatch = useDispatch();
   const getUsers = ({ participants }) => {
     console.log({ participants });
   };
   const enterRooms = ({ roomId }) => {
     console.log({ roomId });
      navigate(`/meeting/${roomId}`);
   };
  useEffect(() => {
    if (!socket) return;
    setTimeout(() => {
      console.log("create-room");
      
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream1) => {
            setStream1(stream1);
            dispatch(getStream(stream1));
          });
      } catch (err) {
        console.log(err);
      }

     
      socket.on("get-users", getUsers);
      console.log("gg");
    }, 0);
  }, [ ]);
  useEffect(()=>{
      if(!peer) return;
    if(!stream) return;
     setTimeout(()=>{
      console.log("123");

      socket.on("user-joined", ({ peerId }) => {
     
        const call = peer.call(peerId, stream);
        console.log("strewam socket1");
        console.log(call)
        call.on("stream", (peerStream) => {
          console.log("strewam socket");
          console.log(peerStream);
          dispatch(addpeers({peerId, peerStream}));
        });
      });
      peer.on("call", (call) => {
        call.answer(stream);
        console.log("strewam socket3");
        call.on("stream", (peerStream) => {
          console.log("call,peer");
          console.log(call);
          console.log(peerStream);
            
          dispatch(addpeers({peerId:call.peer, peerStream}));
        });
      });
   },0)
  },[peer,stream,socket])

 
  return <> {children} </>;
};
export default SocketClient;
