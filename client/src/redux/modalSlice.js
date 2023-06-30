import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState:  false ,
  reducers: {
    Modal: (state,  {payload} ) => {
          console.log({payload});
      state=payload
    },
 
  },
});
export const { Modal} = modalSlice.actions;
export default modalSlice.reducer;
