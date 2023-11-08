 import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import socketReducer from "./socketSlice";
import peerReducer from "./peerSlice";
import messageReducer from "./messageSlice";
import statusReducer from "./statusSlice";
import notifyReducer from "./notifySlice";
import postReducer from "./postSlice";
import profileReducer from "./profileSlice";
import suggestionsReducer from "./suggestionsSlice";
import detailPostReducer from "./detailPostSlice";
import modalReducer from "./modalSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createTransform from "redux-persist/es/createTransform";
import JSOG from "jsog";
 const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
);

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["socket","auth","message",'peer','status','homePosts','notify','profile','detailPost','suggestions','modal'],
  /*  transforms: [JSOGTransform], */
}; 
const rootReducer = combineReducers({
  auth: authReducer,
  socket: socketReducer,
  peer: peerReducer,
  message: messageReducer,
  status: statusReducer,
  homePosts: postReducer,
  notify: notifyReducer,
  profile:profileReducer,
  detailPost:detailPostReducer,
  suggestions:suggestionsReducer,
  modal:modalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
     /*  serializableCheck: {
                ignoredActions: [
                  FLUSH,
                  REHYDRATE,
                  PAUSE,
                  PERSIST,
                  PURGE,
                  REGISTER,
                ],
              }, */
      serializableCheck: false,
    }),
});
export let persistor = persistStore(store);