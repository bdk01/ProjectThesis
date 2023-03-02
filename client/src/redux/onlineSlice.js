import { createSlice } from "@reduxjs/toolkit";

export const onlineSlice = createSlice({
  name: "online",
  initialState: [],
  reducers: {
    Online: (state, { payload }) => {
     
    },
    Offline: (state, { payload }) => {
     
    },
    
  },
});
export const { Online,Offline } = onlineSlice.actions;
export default onlineSlice.reducer;
