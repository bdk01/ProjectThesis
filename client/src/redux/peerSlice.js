import { createSlice } from "@reduxjs/toolkit";

export const peerSlice = createSlice({
  name: "peer",
  initialState: {
    peer: {},
    stream:null,
    room:false,
    allpeers:{}
    /* peerEmit:[] */
  },
  reducers: {
    getPeer: (state, { payload }) => {
  /*     console.log({payload}); */
      state.peer = payload;
    },
    getStream: (state, { payload }) => {
      console.log('stream')
      console.log(payload);
      state.stream = payload;
    },
    getRoom: (state) => {
      state.room = true;
    },
    leaveRoom: (state) => {
      state.room = false;
    },
    logOutpeer: (state) => {
      state.peer = {};
    },
    addpeers:(state,{payload})=>{
      console.log("add")
      
      state.allpeers = {
        ...state.allpeers,
        [payload.peerId]: {stream:payload.peerStream},
      };
    },
    removepeers:(state,payload)=>{
        
    },
  },
});
export const {
  getPeer,
  logOutpeer,
  getStream,
  getRoom,
  leaveRoom,
  addpeers,
  removepeers,
} = peerSlice.actions;
export default peerSlice.reducer;
