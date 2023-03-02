import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


const SocketClient = () => {
  const { auth } = useSelector((state) => state);
  const { socket } = useSelector((state) => state.socket);
  useEffect(() => {
    console.log("emit join");
   /*  setTimeout((()=>{ */
       socket.emit("joinUser", auth.user);
   /*  } 
    ),0) */

  }, [socket, auth.user]);

  return <></>;
};
export default SocketClient;
