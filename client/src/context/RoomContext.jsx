import React, { createContext, useEffect, useReducer, useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPeerStreamAction, removePeerStreamAction } from "../reducers/peerActions";
import { peersReducer } from "../reducers/peerReducer";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";
export const RoomContext = createContext({
    peers: {},
    shareScreen: () => {},
    setRoomId: (id) => {},
    screenSharingId: "",
    roomId: "",
});

export const  RoomProvider = ({children}) => {
 const navigate = useNavigate();

     const [peers, dispatch] = useReducer(peersReducer, {});
    const { auth } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const { peer } = useSelector((state) => state.peer);
  const [stream,setStream] = useState(null)

  const [screenSharingId,setScreenSharingId] = useState("")
    /*   const dispatch = useDispatch(); */
     const getUsers = ({ participants }) => {
     console.log({ participants });
   };
     const removePeer = (peerId) => {
      console.log('out')
      console.log(peerId)
     dispatch(removePeerStreamAction(peerId))
   };
   const shareScreen = ()=>{
    if(screenSharingId){
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(switchStream)
    }
    else{
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream)

    }
   }
   const EndTrack = ()=>{
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream=> stream.onremovetrack())
   }
     const switchStream = (stream) => {
        setStream(stream)
        setScreenSharingId(peer?.id || "");
       /*  Object.values(me?.connections).forEach((connection: any) => {
            const videoTrack: any = stream
                ?.getTracks()
                .find((track) => track.kind === "video");
            connection[0].peerConnection
                .getSenders()
                .find((sender: any) => sender.track.kind === "video")
                .replaceTrack(videoTrack)
                .catch((err: any) => console.error(err));
        }); */
    };
  
  useEffect(() => {
    /*  if(!peer.room) return */
    let token = localStorage.getItem("firstLogin")
    if (!token) return;
   
    setTimeout(() => {
      console.log("create-room");
      
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream1) => {
               console.log(stream1)
            setStream({stream1});
         /*    dispatch(getStream(stream1)); */
          });
      } catch (err) {
        console.log(err);
      }
      console.log(stream)
       socket.on("room-created", ({ roomId }) => {
         console.log({ roomId });
         navigate(`/meeting/${roomId}`);
       });
      socket.on("get-users", getUsers);
      socket.on("user-disconnected",removePeer)
      console.log("gg");
    }, 0);
  }, []);
  useEffect(()=>{
      if(!peer) return;
    if(!stream) return;
     /* setTimeout(()=>{ */
      console.log("123");

      socket.on("user-joined", ({ peerId }) => {
     
        const call = peer.call(peerId, stream);
        console.log("strewam socket1");
        console.log(call)
        call.on("stream", (peerStream) => {
          console.log("strewam socket");
          console.log(peerStream);

          dispatch(addPeerStreamAction(peerId, peerStream));
        });
      });
      peer.on("call", (call) => {
        call.answer(stream);
        console.log("strewam socket3");
        call.on("stream", (peerStream) => {
          console.log("call,peer");
          console.log(call);
          console.log(peerStream);
            
          dispatch(addPeerStreamAction(call.peer, peerStream));
        });
      });
  /*  },0) */
  },[peer,stream])
  console.log({peers})

  return( <RoomContext.Provider
          value={{stream,peers,shareScreen}}
           >
       {children}
   </RoomContext.Provider>)
}
