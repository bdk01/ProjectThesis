/* import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";

import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    
      <ToastContainer
        toastClassName={() =>
          "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
        }
        bodyClassName={() => "text-black text-base font-normal"}
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeButton={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <App  />
 
  </Provider>
); */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
     <Provider store={store}>
  <React.StrictMode>

    <ToastContainer
      toastClassName={() =>
        "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
      }
      bodyClassName={() => "text-black text-base font-normal"}
      position="bottom-left"
      autoClose={4000}
      hideProgressBar={true}
      newestOnTop={false}
      closeButton={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <App />
  </React.StrictMode>
     </Provider>,
  document.getElementById("root")
);
