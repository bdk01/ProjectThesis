import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accesstoken: null,
    isAuth: false,
    user: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isAuth = true;
      state.isFetching = true;
      state.accesstoken = payload.accesstoken;
      state.user = payload.user;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logOut: (state) => {
      state.accesstoken = null;
      state.user = [];
      state.isFetching = false;
      state.isAuth = false;
    },
    getToken: (state, action) => {
      state.accesstoken = action.payload.accesstoken;
    },
    GetRefreshToken: (state, {payload} ) => {
     state.accesstoken = payload.accesstoken;
     state.user = payload.user;
    },
  },
});
export const {
  loginSuccess,
  loginFailure,
  loginStart,
  logOut,
  getToken,
  GetRefreshToken,
} = authSlice.actions;
export default authSlice.reducer;
