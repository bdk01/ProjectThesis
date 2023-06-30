import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MsgDisplay({user, msg, data,sender}) {
     const { auth } = useSelector(state => state)
      const dispatch = useDispatch()
    
  return <div>
      <div className={sender ?` flex flex-col` :' flex flex-col'}>
            <div className={sender ? ` flex justify-start items-center mr-3` : ' flex justify-start items-center ml-3'}>
                    <div className="w-[20px] h-[20px] mr-1">
             { user ?     <img src={user?.avatar} className="w-[100%] h-[100%] rounded-[50%]" alt="" />
                  :    <img src={sender?.avatar} className="w-[100%] h-[100%] rounded-[50%]" alt="" />
            }
                    </div>
             { user ?    <span className="mr-1">{user?.username}</span>
                  :    <span className="mr-1">{sender?.username}</span>
            }
              

            </div>
             <div className="flex justify-end    w-[100%] ">
                <div className=" flex justify-end flex-col  mb-1 mr-1 ">
                  <div className="mb-[4px] flex justify-end flex-col">

                   { msg.text &&  <div className="bg-blue-700 max-w-[90%] min-w-[70%] pr-2 text-left text-white text-base font-normal pl-2 py-2 rounded-l-lg rounded-tr-lg " >
                                    {msg.text}
                        </div>}
                  </div>

                        <div className="flex justify-end text-gray-400 font-medium text-xs">
                              {new Date(msg.createdAt).toLocaleString()} 
                        </div>
                
                    </div>
             </div>
        </div>
     </div>;
}
