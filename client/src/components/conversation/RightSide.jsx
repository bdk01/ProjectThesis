import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";
import MsgDisplay from "./MsgDisplay";
import { addMessages, getMessages, getMoreMessages } from "../../api/messageAPI";
import { v4 as uuidv4 } from 'uuid';
import { getRoom } from "../../redux/peerSlice";
export default function RightSide() {
    const { auth, message} = useSelector(state => state)
    const { socket } = useSelector(state => state.socket)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState([])
  const [attendee, setAttendee] = useState([])
  const [text, setText] = useState('')
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(1)
  const [isLoadMore, setIsLoadMore] = useState(0)
    const [data, setData] = useState([])
   const refDisplay = useRef()
     const navigate = useNavigate()
    const pageEnd = useRef()
 
  const handleSubmit = async(e)=>{
    e.preventDefault()
      if (!text.trim()) return;

      setText('')
      let newArr = [];
      const msg = {
          conversation:id,
          sender: auth?.user?._id,
          text,
          media: newArr,
          createdAt: new Date().toISOString()
      }
    console.log('message')
    const attendees = {attendees:message.data[0].conversation.attendees}

       await addMessages(msg,auth,socket,dispatch,attendees)
       if(refDisplay.current){
              setTimeout(() => {
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                },50)
        }
  }
    useEffect(() => {
        if(auth.accesstoken){
            const getMessagesData = async () => {
                if (message?.data?.every(item => item?._id !== id)) {
                   await getMessages( {auth, id,dispatch} )
                 
                    setTimeout(() => {
                    refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
                },10)
            }
        }
            getMessagesData()

        }
    }, [id, dispatch, auth, message.data.message])
   

    useEffect(() => {
        const newData = message?.data?.find(item => item._id === id)
        
        
        if (newData) {
          
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
       
         } 
    }, [message.data, id])
    
        
        useEffect(() => {
            
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    setIsLoadMore(p => p + 1)
                }
            }, {
                threshold: 0.1
            })
           
            observer.observe(pageEnd.current)
        }, [setIsLoadMore])
    useEffect(() => {
        setTimeout(()=>{
            if (isLoadMore > 1) {
                if (result >= page * 9) {
                    dispatch(getMoreMessages({ auth, id:id, page: page + 1,dispatch }))
                    setIsLoadMore(1)
                }
            }

        },150)
       
    }, [isLoadMore])
  /*   const handleJoin = ()=>{
         dispatch(getRoom())
         setTimeout(()=>{
             socket.emit('create-room')
              socket.on("room-created", ({ roomId }) => {
          
            navigate(`/meeting/${roomId}`);
       });
         },0)
    } */
  /*   useEffect(()=>{
        if(peer.room){

       
        }
    },[peer.room]) */

  return <div className="flex flex-col h-[100%] ">
        <div className="py-1 px-4 h-[58px] flex flex-row justify-between bg-slate-300 border-gray-400  border-b-[2px] cursor-pointer w-[100%]">
       
           <div className="flex">
                    <div className="w-[46px] h-[46px]" >
                    <img className=" w-[100%] h-[100%] rounded-[50%]" src="https://res.cloudinary.com/khoa252001/image/upload/v1668777257/socialmedia/duck_orrdvy.jpg" />
                </div>   
                <div className="ml-3 flex justify-start items-start flex-col">
                    <div className="font-medium text-blue-400">Meeting</div>
                    <div className="font-medium text-blue-400">welcome</div>
                </div>
           </div>
           <div className="flex justify-center items-center">
           {/*  <button className="px-2 py-2 bg-gray-700 text-white text-sm rounded-[8%]" onClick={handleJoin}> 
              Join with us
            </button> */}
           </div>
        </div>
        <div className=" h-[calc(100%-58px)] w-[100%] overflow-y-auto overflow-x-hidden" >

            <div className=" min-h-[100%] flex justify-end flex-col " ref={refDisplay}>
        {/* grid grid-rows-6  row-span-5 row-span-1 */}
        
                    <button style={{ marginTop: '-21px',backgroundColor:"transparent"  }} className="invisible" ref={pageEnd}>
                        Load more
                    </button>
            
                <div className=" h-[100%] flex flex-col  justify-end">
                    <div className="flex justify-start">

            
                    </div>
                    {
                        data.map((msg, index) => (
                            <div key={index}>
                                {
                                    msg?.sender._id !== auth?.user._id &&
                                    <div key={index} className="flex justify-start ml-2">
                                            <MsgDisplay sender={msg.sender} msg={msg} />
                                        </div>
                                }

                                {
                                    msg?.sender._id  === auth?.user._id &&
                                    <div key={index} className="flex justify-end ">
                                            <MsgDisplay user={auth.user} msg={msg} sender="true" data={data} />
                                        </div>
                                }
                            </div>
                        ))
                    }
                </div>
                </div>
        </div>
                <div className=" h-[40px] relative ">
                <form className="  border-gray-400  border-t-[2px] h-[100%]" onSubmit={handleSubmit}  >
                        <input type="text" placeholder="Enter you message..."
                        value={text} onChange={e => setText(e.target.value)}  className="w-[90%] h-[70%] border-none outline-none  px-6 text-black"
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
     </div>;
}
