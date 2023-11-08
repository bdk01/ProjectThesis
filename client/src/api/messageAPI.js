
import axios from "../axios";
import { AddMessage, GetConversations, GetMessage } from "../redux/messageSlice";



export const getConversations = async ( auth,page ,dispatch) => {
    try {
      const res = await axios.get(`/api/conversations`, {
        headers: { Authorization: auth.accesstoken },
      });
      let newArr = [];
      res.data.conversations.forEach((item) => {
        newArr.push(...item.event)
      });
      console.log(res.data)
      console.log('xemnewArr')
        console.log(newArr)
      dispatch(GetConversations({ newArr, result: res.data.result }));
 
    } catch (err) {
     console.log(err)
    }
  };
export const getMessages = async ( {auth,id,page=1,dispatch}) => {
    try {
    /*   console.log(page) */
      const res = await axios.get(`/api/message/${id}?limit=${page * 9}`, {
        headers: { Authorization: auth.accesstoken },
      });
        
    /*   const newData = { messages: res.data.conversation.messages }; */
      const newData = {
        ...res.data,
        messages: res.data.messages.reverse(),
      };
 
     await dispatch(GetMessage({...newData,_id:id,page:page} ));
 
    } catch (err) {
     console.log(err)
  };
}
export const getMoreMessages = async ( {auth,id,page=1,dispatch}) => {
    try {
    
     const res = await axios.get(`/api/message/${id}?limit=${page * 9}`, {
       headers: { Authorization: auth.accesstoken },
     });
     
    /*   const newData = { messages: res.data.conversation.messages }; */
      const newData = {
        ...res.data,
        messages: res.data.messages.reverse(),
      };
 
   await   dispatch(GetMessage({...newData,_id:id,page:page} ));
 
    } catch (err) {
     console.log(err)
  };
}
export const addMessages = async ( msg,auth,socket,dispatch,attendees) => {

  try {
    /*    */

    const people = attendees.attendees.filter(attendee => attendee!==auth.user._id)

      socket.emit('addMessage', {msg,auth,people})
    const res = await axios.post(`/api/message`,msg,{
      headers: { Authorization: auth.accesstoken },
    }); 
  
    dispatch(AddMessage({...msg,sender:res.data.sender}));
    } catch (err) {
     console.log(err)
  };
}