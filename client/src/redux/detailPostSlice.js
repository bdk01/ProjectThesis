import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "../utils/helper";

export const detailPostSlice = createSlice({
  name: "detailPost",
  initialState: {

    post: []
  },
  reducers: {
    loading: (state,{payload}) => {
      console.log(payload)
      state.loading = payload;
    },
    getDetailPost: (state,{payload}) => {
       state.post=[payload, ...state.post]
    },
    updateDetailPost: (state,{payload}) => {
     state.post=EditData(state.post, payload._id,payload)
    },
  
  },
});
export const {
     loading,getDetailPost, updateDetailPost

} = detailPostSlice.actions;
export default detailPostSlice.reducer;
