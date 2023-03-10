import React from "react";
import { FcEndCall } from "react-icons/fc";
import { BsChatDots,BsPeople,BsCameraVideo,BsCameraVideoOff,BsMic,BsMicMute} from "react-icons/bs";
import { FiShare } from "react-icons/fi";

export default function Meeting() {
  
  return <div className="mx-6  border-[2px] border-gray-400  h-[570px] ">
        <div className=" border-gray-400 w-[100%] h-[60px]">
         <div className="mb-1 px-4  flex flex-row justify-between bg-slate-300 border-gray-400  border-b-[2px] cursor-pointer w-[100%]">
            <div className="flex">
                      <div className="w-[46px] h-[46px]" >
                      <img className=" w-[100%] h-[100%] rounded-[50%]" src="https://res.cloudinary.com/khoa252001/image/upload/v1668777257/socialmedia/duck_orrdvy.jpg" />
                  </div>   
                  <div className="ml-3 flex justify-start items-start flex-col">
                      <div className="font-medium text-blue-400">Meeting</div>
                      <div className="font-medium text-blue-400">welcome</div>
                  </div>
            </div>
            <div className="flex">
                 <div className="flex flex-col px-4 justify-center items-center ">
                   <BsChatDots className="text-2xl mr-1"/> 
                    <div className="text-sm">
                     Chat
                    </div>   
                </div>
                 <div className="flex flex-col px-4 justify-center items-center ">
                   <BsPeople className="text-2xl mr-1"/> 
                    <div className="text-sm">
                     People
                    </div>   
                </div>
                 <div className="flex flex-col px-4 justify-center items-center ">
                   <BsCameraVideo className="text-2xl mr-1"/> 
                    <div className="text-sm">
                     Camera
                    </div>   
                </div>
             
                 <div className="flex flex-col px-4 justify-center items-center ">
                   <BsMic className="text-2xl mr-1"/> 
                    <div className="text-sm">
                     Mic
                    </div>   
                </div>
                 <div className="flex flex-col px-4 justify-center items-center ">
                   <FiShare className="text-2xl mr-1"/> 
                    <div className="text-sm">
                     Share
                    </div>   
                </div>
            </div>
            <div className="flex justify-center items-center ">
              <button className="px-4 py-2 lex justify-center items-center bg-red-600 text-white text-sm font-bold rounded-[8%] flex"> 
              <FcEndCall className="text-2xl mr-1"/> 
               Leave
              </button>
            </div>
          </div>
        </div>
        <div className=" h-[calc(100%-60px)]">

          <div className="flex  h-[100%] items-center justify-center">
          qweqwe
          </div>
        </div>
    </div>;
}
