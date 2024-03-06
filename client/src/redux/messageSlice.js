import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moveObjectToFirst } from "../utils/helper";
import axios from '../axios'
export const fetchMessage = createAsyncThunk(
  'data/fetchMessage',
  async (additionalParam, thunkAPI) => {
    try {
      // Here you can access additionalParam
      console.log('Additional Param:', additionalParam.id);
      
      // Perform your async operation, for example fetching data from an API
      const res = await axios.get(`/api/message/${additionalParam.id}?limit=${additionalParam.page * 9}`, {
        headers: { Authorization: additionalParam.auth.accesstoken },
      });
      console.log(additionalParam.dispatch)
   
       const newData = {
         ...res.data,
         messages: res.data.messages.reverse(),
       };
      /*  await  */    thunkAPI.dispatch(GetMessage({...newData,_id:additionalParam.id,page:additionalParam.page} ));
      // You can also access the Redux store state and dispatch additional actions
    /*   thunkAPI.dispatch(someOtherAction()); */
      
      /* return data; */
    } catch (error) {
      // Handle errors
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
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
  
        state.users=moveObjectToFirst(state.users,payload.conversation)
  
    },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessage.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.data = [payload]
      })
      .addCase(fetchMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  },
});
export const { GetMessage, GetConversations, AddUser,CheckOnline,AddMessage,GetUserChat } = messageSlice.actions;
export default messageSlice.reducer;
