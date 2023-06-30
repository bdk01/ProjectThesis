import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: { status: false,onEdit:false,post:{} },
  reducers: {
    OpenStatus: (state,  {payload} ) => {
          console.log({payload});
      state.status = payload.status;
    },
    CloseStatus: (state, { payload }) => {
      console.log({ payload });
        state.status = payload.status;
        state.onEdit = false
            state.post = {}
    },
   OpenStatusEdit: (state,  {payload} ) => {
          console.log({payload});
      state.status = payload.status;
      state.onEdit = payload.onEdit;
      state.post = payload.post
    },
  },
});
export const { OpenStatus, CloseStatus,OpenStatusEdit } = statusSlice.actions;
export default statusSlice.reducer;
