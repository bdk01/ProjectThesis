import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import MsgDisplay from "./MsgDisplay";
import { getMessages } from "../api/messageAPI";
export default function RightSide() {
    const { auth, message, socket } = useSelector(state => state)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState([])
  const [text, setText] = useState('')
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(1)
  const [isLoadMore, setIsLoadMore] = useState(0)
    const [data, setData] = useState([])
   const refDisplay = useRef()
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(text)
  }
    useEffect(() => {
        const getMessagesData = async () => {
            if (message?.data?.every(item => item._id !== id)) {
               
               await getMessages( auth, id,page,dispatch )
        }
    }
        getMessagesData()
    }, [id, dispatch, auth, message.data])
    useEffect(() => {
        if (id && message.users.length > 0) {
           
            const newUser = message.users.find(user => user._id === id)
            if (newUser) setUser(newUser)
        }
    }, [message.users, id])
    useEffect(() => {
        console.log('m')
        /* console.log(message.data) */
        const newData = message?.data?.find(item => item._id === id)
        console.log('gg')
        console.log(newData)
        if (newData) {
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
       
         } 
    }, [message.data, id])

  return <div className="flex flex-col h-[100%] ">
        <div className="py-1 px-4  flex flex-row bg-slate-300 border-gray-400  border-b-[2px] cursor-pointer w-[100%]">
       
            <div className="w-[46px] h-[46px]" >
               <img className=" w-[100%] h-[100%] rounded-[50%]" src="https://res.cloudinary.com/khoa252001/image/upload/v1668777257/socialmedia/duck_orrdvy.jpg" />
           </div>   
           <div className="ml-3 flex justify-start items-start flex-col">
              <div className="font-medium text-blue-400">{user?.username}</div>
              <div className="font-medium text-blue-400">{user?.fullname}</div>
           </div>
        </div>
        <div className=" min-h-[100%] ">
{/* grid grid-rows-6  row-span-5 row-span-1 */}
  
     
        <div className=" h-[82%] flex flex-col  justify-end">
            
              <div className="flex justify-start">

       
            </div>
              {
                  data.map((msg, index) => (
                      <div key={index}>
                          {
                              msg.sender !== auth.user._id &&
                              <div className="flex justify-start ml-2">
                                      <MsgDisplay user={user} msg={msg} />
                                </div>
                          }

                          {
                              msg.sender === auth.user._id &&
                               <div className="flex justify-end ">
                                      <MsgDisplay user={auth.user} msg={msg} sender="true" data={data} />
                                </div>
                          }
                      </div>
                  ))
              }
         </div>
        <div className=" h-[8%]">
           <form className="relative   border-gray-400  border-t-[2px]" onSubmit={handleSubmit}  >
                <input type="text" placeholder="Enter you message..."
                value={text} onChange={e => setText(e.target.value)}  className="w-[90%] border-none outline-none py-2 px-6 text-black"
                />

             {/*    <Icons setContent={setText} content={text} theme={theme} />

                <div className="file_upload">
                    <i className="fas fa-image text-danger" />
                    <input type="file" name="file" id="file"
                    multiple accept="image/*,video/*" onChange={handleChangeMedia} />
                </div> */}

                <button type="submit" className="absolute px-1 right-[-2px] top-[10px] cursor-pointer " 
                /* disabled={text > 0 ? true : false}  */>
                    <AiOutlineSend className="text-xl"/>
                </button>
            </form>
        </div>
        </div>
     </div>;
}
