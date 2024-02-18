import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createNotify, getNotifies } from "./api/notifyAPI"
import { follow } from "./api/profileAPI"
import { GetUserInf } from "./redux/authSlice"
import { addMessages, getConversations } from "./api/messageAPI"
import { AddMessage, AddUser } from "./redux/messageSlice"
import { showNotification } from "./utils/helper"

export default function SocketClient() {
  const { auth,  notify } = useSelector(state => state)
  const { socket } = useSelector(state => state.socket)
  const dispatch = useDispatch()
  const refDisplay = useRef()
  /* const audioRef = useRef() */

  // joinUser
  useEffect(() => {
    
      socket.emit('joinUser', auth.user)
    
  },[socket, auth.user])

  // Likes
  useEffect(() => {
      socket.on('likeToClient', newPost =>{
       /*    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) */
      })

      return () => socket.off('likeToClient')
  },[socket, dispatch])

  useEffect(() => {
      socket.on('unLikeToClient', newPost =>{
       /*    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) */
      })

      return () => socket.off('unLikeToClient')
  },[socket, dispatch])


  // Comments
  useEffect(() => {
      socket.on('createCommentToClient', newPost =>{
       /*    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) */
      })

      return () => socket.off('createCommentToClient')
  },[socket, dispatch])

  useEffect(() => {
      socket.on('deleteCommentToClient', newPost =>{
        /*   dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost}) */
      })

      return () => socket.off('deleteCommentToClient')
  },[socket, dispatch])


 
  useEffect(() => {
      socket.on('followToClient', newUser =>{
        console.log('followsocket')
         /*  dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}}) */
          dispatch(GetUserInf({...auth, user: newUser}))
      })

      return () => socket.off('followToClient')
  },[socket, dispatch, auth])

  useEffect(() => {
      socket.on('unFollowToClient', newUser =>{
    
      })

      return () => socket.off('unFollowToClient')
  },[socket, dispatch, auth])


  // Notification
  useEffect(() => {
      socket.on('createNotifyToClient', msg =>{
        console.log('msg')
        console.log(msg)
        createNotify({msg, auth, dispatch,socket})
     
        getNotifies({auth,dispatch})
        showNotification('success','You have new notification !')
      })
      return () => socket.off('createNotifyToClient')
  },[socket, dispatch, auth.user])

  useEffect(() => {
      socket.on('removeNotifyToClient', msg =>{
        /*   dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg}) */
      })

      return () => socket.off('removeNotifyToClient')
  },[socket, dispatch])


  // Message
  useEffect(() => {
      socket.on('addMessageToClient',({msg,authuser,people})=>{
    
     /*   addMessages(msg,auth,socket,dispatch,attendees) */
     /*   ) */
     console.log({msg,authuser,people})
     dispatch(AddMessage({...msg,sender:authuser.user}));
     let page =1
     getConversations(auth,page,dispatch)
   
    /*  dispatch(AddUser({...msg.user,  text: msg.text, media: msg.media})) */
     /* let page =1
     getConversations(auth,page,dispatch) */
         /*  dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg}) */
       /*    dispatch({
              type: MESS_TYPES.ADD_USER, 
              payload: {
                  ...msg.user, 
                  text: msg.text, 
                  media: msg.media
              }
          }) */

      })

      return () => socket.off('addMessageToClient')
  },[socket, dispatch])


 
}

