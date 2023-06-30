import axios from "../axios"
import { getNotify, removeAllNotify, updateNotify } from "../redux/notifySlice"
export const createNotify = async ({msg, auth, dispatch}) => {
    try {
        console.log(msg)
       const res =   await axios.post("/api/notify", msg , {
                headers: { Authorization: auth.accesstoken }
            })
         console.log(res)
            /*  socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        }) */

    } catch (err) {
     console.log(err)
    }
}
export const getNotifies= async ({auth,dispatch}) => {
    try {
  
   
       const res =   await axios.get("/api/notifies", {
                headers: { Authorization: auth.accesstoken }
            })
          console.log(res)
            /*   dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies }) */
            dispatch(getNotify(res.data.notifies))
            /*  socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        }) */

    } catch (err) {
     console.log(err)
    }
}
export const removeNotify= async ({auth,msg,dispatch}) => {
    try {
     console.log('getnotify')
       const res =   await axios.delete(`/api/${msg.id}?url=${msg.url}`, {
                headers: { Authorization: auth.accesstoken }
            })
  
          

    } catch (err) {
     console.log(err)
    }
}
export const isReadNotify= async ({auth,msg,dispatch}) => {
    try {
  
     
     dispatch(updateNotify({...msg,isRead:true}))
       const res =   await axios.patch(`/api/isReadNotify/${msg._id}`,{}, {
                headers: { Authorization: auth.accesstoken }
            })
         

    } catch (err) {
     console.log(err)
    }
}
export const deleteAllNotifies= async ({auth,dispatch}) => {
    try {

      dispatch(removeAllNotify([]))
       const res =   await axios.delete(`/api/deleteAllNotify`, {
                headers: { Authorization: auth.accesstoken }
            })
          console.log(res)
      
   

    } catch (err) {
     console.log(err)
    }
}