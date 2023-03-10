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
import messageReducer from "./messageSlice";
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
  blacklist: ["socket","auth","message"],
  /*  transforms: [JSOGTransform], */
}; 
const rootReducer = combineReducers({
      auth: authReducer,
      socket: socketReducer,
      message:messageReducer
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