import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    users: [],
    resultUsers: 0,
    data: [],
    firstLoad: false,
  },
  reducers: {
    GetConversations: (state, { payload }) => {
      state.firstLoad = true;
      state.users = payload.newArr;
      state.resultUsers = payload.result;
    },
    AddUser: (state, { payload }) => {
       if(state.users.every(item => item._id !== payload._id)){
                    state.users=[payload, ...state.users]
       }
    },
    GetMessage: (state,  {payload} ) => {
     console.log([payload])
      state.data=[payload]
  
    },
    CheckOnline:(state, { payload }) =>{
        console.log(payload);

    }
  },
});
export const { GetMessage, GetConversations, AddUser,CheckOnline } = messageSlice.actions;
export default messageSlice.reducer;
