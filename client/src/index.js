
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "./i18ns/i18n.config"
import { I18nextProvider } from "react-i18next";
import { MantineProvider } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query';
const queryClient = new QueryClient();
ReactDOM.render(
     <Provider store={store}>
        <QueryClientProvider client={queryClient}>

     
  <React.StrictMode>

    {/* <ToastContainer
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
    /> */}
   <I18nextProvider i18n={i18n}>
   <MantineProvider    theme={{
          components: {
            Button: {
              defaultProps: {
                size: 'xs',
                color:  "red",
              },
            },
           }}} withCSSVariables withGlobalStyles withNormalizeCSS >

    <App />
   </MantineProvider>
  

    </I18nextProvider>
  </React.StrictMode>
  </QueryClientProvider>
     </Provider>,
  document.getElementById("root")
);
