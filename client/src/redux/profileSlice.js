import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "../utils/helper";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
     loading: false,
    ids: [],
    users: [],
    posts: []
  },
  reducers: {
    loading: (state,{payload}) => {
      console.log(payload)
      state.loading = payload;
    },
    getUser: (state,{payload}) => {
      console.log(payload)
       state.users=[payload, ...state.users]
    },
    followUser: (state,{payload}) => {
     state.users = EditData(state.users, payload._id,payload)
    },
    unfollowUser: (state,{payload}) => {
     state.users = EditData(state.users, payload._id,payload)
    },
      getPosts: (state,{payload}) => {
         console.log(payload)
       state.posts=[payload, ...state.posts]
    },
      updatePost: (state,{payload}) => {
       state.posts=EditData(state.posts, payload._id,payload)
    },
    getIds: (state,{payload}) => {
      console.log(payload)
        state.ids=[payload, ...state.ids]
    },
  },
});
export const {
     loading,getUser,getIds,followUser,unfollowUser,getPosts,updatePost

} = profileSlice.actions;
export default profileSlice.reducer;
