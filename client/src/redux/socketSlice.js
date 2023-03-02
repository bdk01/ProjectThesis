import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: [],
    /* socketEmit:[] */
  },
  reducers: {
    getSocket: (state,  {payload}) => {
      state.socket = payload;
       console.log(state.socket);
    /*   state.socket = payload.socket.emit */
    /*   state.socketEmit = payload.socket.emit; */
    },
    logOutSocket: (state) => {
      state.socket = [];
      
    },
  },
});
export const {  getSocket, logOutSocket } =
  socketSlice.actions;
export default socketSlice.reducer;
