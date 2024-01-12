import { createSlice } from "@reduxjs/toolkit";
import { moveObjectToFirst } from "../utils/helper";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    users: [],
    resultUsers: 0,
    data: [],
    userChat:{},
    firstLoad: false,
  },
  reducers: {
    GetConversations: (state, { payload }) => {  
      state.firstLoad = true;
      state.users = payload.newArr;
      state.resultUsers = payload.result;
    },
    AddUser: (state, { payload }) => {
      console.log('adduser')
      console.log(payload)
      state.userChat = payload
      console.log(state.users)
       if(state.users.every(item => item._id !== payload._id)){
                    state.users=[payload, ...state.users]
       }
    },
    GetMessage: (state,  {payload} ) => {
     console.log(payload)
      state.data=[payload]
      
    },
    CheckOnline:(state, { payload }) =>{
        console.log(payload);

    },
    GetChat:(state,{payload})=>{

    },
    AddMessage:(state, { payload }) =>{
      console.log('addmess')
      console.log(payload);
        state.data.map(item=>{
     
            state.data=[{
              ...item,
               messages: [...item.messages, payload],
               result: item.result + 1
            } ]
        })
      /*   const moveObjectToFirst = (array, objectId) => {
          const newArray = [...array];
          const indexToMove = newArray.findIndex(obj => obj.id === objectId);
        
          if (indexToMove !== -1) {
            const objectToMove = newArray.splice(indexToMove, 1)[0];
            newArray.unshift(objectToMove);
          }
        
          return newArray;
        }; */
        state.users=moveObjectToFirst(state.users,payload.conversation)
     /*    const gg1 = [...state.users]
        console.log(gg1) */


   /*    if(state.users.every(user => user.conversation === payload.conversation)){
        state.users=[payload, ...state.users]
      } */
    /*  const  gg = state.users.filter(
         (user) =>  user.conversation !== payload.conversation
       );
  
         state.users=[{ ...state.userChat  } , ...gg] 
     */
    },
  },
});
export const { GetMessage, GetConversations, AddUser,CheckOnline,AddMessage,GetUserChat } = messageSlice.actions;
export default messageSlice.reducer;
