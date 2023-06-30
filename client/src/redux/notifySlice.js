import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "../utils/helper";

export const notifySlice = createSlice({
  name: "notify",
  initialState: {
      loading: false,
    data: [],
    sound: false
  },
  reducers: {
    createNotify: (state,{payload}) => {
     /*  state.isFetching = true; */
       state.data=[payload, ...state.data]
    },
    getNotify: (state,{payload}) => {
      console.log(payload)
       state.data=payload
     /*  state.data =payload; */
 
    },
    updateNotify: (state,{payload}) => {
      console.log(payload)
   
     state.data = EditData(state.data, payload._id,payload)
    },
    removeNotify: (state,{payload}) => {
      console.log(payload)
     
/*      state.data = DeleteData(state.data, payload._id) */
       state.data =  state.data.filter(item => (
                    item.id !== payload.id || item.url !== payload.url
                ))
    },
    removeAllNotify: (state,{payload}) => {
    
   
     state.data = payload     
    },
 
  },
});
export const {
  createNotify,getNotify,updateNotify,removeOneNotify, removeAllNotify

} = notifySlice.actions;
export default notifySlice.reducer;
