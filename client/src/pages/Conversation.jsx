import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeftSide from "../components/conversation/LeftSide";
import RightSide from "../components/conversation/RightSide";
import Message from "../assets/img/message2.svg"
export default function Conversation() {
  const { id } = useParams()
  const [iduser,setIduser] = useState()
  useEffect(()=>{
 
    setIduser(id)
  },[id])
  return <div className="  border-[2px] border-gray-400 grid grid-cols-6 sm:grid-cols-5 h-[calc(100vh-70px)]">
        <div className="col-span-2 sm:col-span-1 min-h-[100%]  border-gray-400 border-r-[2px]">
          <div className="flex mb-6  flex-col   ">
              <LeftSide/>
          </div>
        </div>
        <div className="col-span-4 min-h-[100%]">

           { iduser ?     <RightSide/>:
        <div className="flex  h-[100%] items-center justify-center">
          <img src={Message} alt="" className="w-[120px] h-[120px]"   />
        </div>
            }
   
        </div>
    </div>;
}
