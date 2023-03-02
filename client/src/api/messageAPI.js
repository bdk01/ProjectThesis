
import axios from "../axios";
import { GetConversations, GetMessage } from "../redux/messageSlice";



export const getConversations = async ( auth,page ,dispatch) => {
    try {
      const res = await axios.get(`/api/conversations?limit=${page * 9}`, {
        headers: { Authorization: auth.accesstoken },
      });
      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            });
          }
        });
      });
      dispatch(GetConversations({ newArr, result: res.data.result }));
 
    } catch (err) {
     console.log(err)
    }
  };
export const getMessages = async ( auth,id,page,dispatch) => {
    try {
      const res = await axios.get(`/api/message/${id}?limit=${page * 9}`,{
        headers: { Authorization: auth.accesstoken },
      });
 
      const newData = {...res.data, messages: res.data.messages.reverse()}
      
      dispatch(GetMessage({...newData,_id:id,page:page} ));
 
    } catch (err) {
     console.log(err)
  };
}