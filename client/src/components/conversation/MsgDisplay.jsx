import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MsgDisplay({user, msg, data,sender}) {
     const { auth } = useSelector(state => state)
      const dispatch = useDispatch()
    
  return <div>
      <div className={sender ?` flex flex-col` :' flex flex-col'}>
            <div className={sender ? ` flex justify-end items-center mr-1` : ' flex justify-end items-center ml-3'}>
                   
           {/*   { user ?     <img src={user?.avatar} className="w-[100%] h-[100%] rounded-[50%]" alt="" />
                  :    <img src={sender?.avatar} className="w-[100%] h-[100%] rounded-[50%]" alt="" />
            } */}
                  
             { user ?    <span className="mr-4">{user?.username}</span>
                  :    <span className="mr-1">{sender?.username}</span>
            }
              

            </div>
             <div className="flex justify-end   w-[100%] ">
                <div className=" flex justify-end flex-col  mb-1 mr-1 ">
                  <div className="mb-[4px] flex justify-start flex-col">

                {/*    { msg.text &&  <div className="bg-blue-700 max-w-[90%] min-w-[70%] pr-2 text-left text-white text-base font-normal pl-2 py-2 rounded-l-lg rounded-tr-lg " >
                                    {msg.text}
                        </div> } */}
                        { user ?  <div className="flex items-center justify-end">
                              <div className="bg-blue-700 max-w-[90%] min-w-[70%] mr-1 text-left text-white text-base font-normal pl-2 py-2 rounded-l-lg rounded-tr-lg " >
                                    {msg.text}
                        </div> <img src={user?.avatar} className="w-[35px] h-[35px] rounded-[50%]" alt="#"  loading="lazy"/>
                        </div>  
                  :    <div className="flex items-center justify-start"> <img src={sender?.avatar} className="w-[35px] h-[35px] rounded-[50%] mr-1" alt="#"  loading="lazy"/>
                  <div className="bg-blue-700 max-w-[90%] min-w-[70%] pr-2 text-left text-white text-base font-normal pl-2 py-2 rounded-l-lg rounded-tr-lg " >
                        {msg.text}
            </div>
            </div>  
            }

                  </div>

                        <div className="flex justify-end text-gray-400 font-medium text-xs">
                              {new Date(msg.createdAt).toLocaleString()} 
                        </div>
                
                    </div>
             </div>
        </div>
     </div>;
}
