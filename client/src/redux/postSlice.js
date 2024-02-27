import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "../utils/helper";

export const postSlice = createSlice({
  name: "homePosts",
  initialState: {
    loading: false,
    posts: [],
    result: 0,
    page: 2
  },
  reducers: {
    createPost: (state) => {
      state.isFetching = true;
    },
    getPost: (state,{payload}) => {
  
      state.posts =payload.posts;
      state.result = payload.result;
      state.page = payload.page;
    },
    updatePost: (state,{payload}) => {
    
   
     state.posts = EditData(state.posts, payload._id,payload)
    },
    deleteOnePost: (state,{payload}) => {
   
   
     state.posts = DeleteData(state.posts, payload._id)
    },
    resetPosts:(state)=>{
      console.log('reset')
      state.posts=[]
      state.result= 0
      state.page= 2
    
      

    }
  },
});
export const {
  createPost,getPost,updatePost,deleteOnePost,resetPosts

} = postSlice.actions;
export default postSlice.reducer;
