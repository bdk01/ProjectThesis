
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

      dispatch(GetConversations({ newArr, result: res.data.result }));
 
    } catch (err) {
     console.log(err)
    }
  };
export const getMessages = async ( auth,id,page,dispatch) => {
    try {
      const res = await axios.get(`/api/message/${id}`,{
        headers: { Authorization: auth.accesstoken },
      });
    
    /*   const newData = { messages: res.data.conversation.messages }; */
      const newData = {
        ...res.data,
        messages: res.data.conversation.messages,
      };
 
      dispatch(GetMessage({...newData,_id:id,page:page} ));
 
    } catch (err) {
     console.log(err)
  };
}
export const addMessages = async ( msg,auth,socket,dispatch) => {
  console.log("add")
   
/*    */
  /* socket.emit('addMessage', {...msg, user: { _id, avatar, fullname, username } }) */
  try {
    const res = await axios.post(`/api/message`,msg,{
      headers: { Authorization: auth.accesstoken },
    }); 
    console.log(res.data)
    dispatch(AddMessage({...msg,sender:res.data.sender}));
    } catch (err) {
     console.log(err)
  };
}