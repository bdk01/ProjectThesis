import { createSlice } from "@reduxjs/toolkit";
import { DeleteData, EditData } from "../utils/helper";

export const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState: {
     loading: false,
    users: []
  },
  reducers: {
    loading: (state,{payload}) => {
      console.log(payload)
      state.loading = payload;
    },
    getUsers: (state,{payload}) => {
      console.log(payload)
       state.users=payload.users
    },
   
  },
});
export const {
     loading,getUsers

} = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
