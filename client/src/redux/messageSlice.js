import { createSlice } from "@reduxjs/toolkit";

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
      state.userChat = payload
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
      console.log(payload);
        state.data.map(item=>{
     
            state.data=[{
              ...item,
               messages: [...item.messages, payload],
               result: item.result + 1
            } ]
        })
       state.users = state.users.filter(
         (user) => user.conversation !== payload.conversation
       );
         state.users=[{ ...state.userChat  } , ...state.users] 
      /*  state.users.map(user => {
              if(user._id === payload.recipient || user._id === payload.sender){
                state.users= [ {
                  ...user, 
                  text: payload.text, 
                 media: payload.media,      
             }]
            }
            else{
                state.users={...user}
              }
            }
         )   */
      /*   console.log(state.users) */
    },
  },
});
export const { GetMessage, GetConversations, AddUser,CheckOnline,AddMessage,GetUserChat } = messageSlice.actions;
export default messageSlice.reducer;
