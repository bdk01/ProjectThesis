import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "../utils/helper";

export const detailPostSlice = createSlice({
  name: "detailPost",
  initialState: {
    posts: []
  },
  reducers: {
    loading: (state,{payload}) => {
 
     /*  state.loading = payload; */
    },
    getDetailPost: (state,{payload}) => {
      console.log(payload)
       state.posts=[...state.posts,payload]
    },
    updateDetailPost: (state,{payload}) => {
     state.posts=EditData(state.posts, payload._id,payload)
    },
  
  },
});
export const {
     loading,getDetailPost, updateDetailPost

} = detailPostSlice.actions;
export default detailPostSlice.reducer;
