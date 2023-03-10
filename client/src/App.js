import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
/* import { DefaultLayout } from "./components/DefaultLayout/DefaultLayout"; */
import Conversation from "./pages/Conversation";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "./redux/socketSlice";

import SocketClient from "./SocketClient";
import Header from "./components/Header/Header";
import { refreshToken } from "./api/authAPI";
import Main from "./components/Main";
import NotFound from "./pages/NotFound/NotFound";
import CreateMeeting from "./pages/CreateMeeting";
import Meeting from "./pages/Meeting";

function App() {
  const dispatch = useDispatch();

  const { auth ,socket} = useSelector((state) => state);
  useEffect(() => {
    refreshToken(dispatch)
    const socket = io("ws://localhost:8000");
   
    dispatch(getSocket(socket));
 
    return () => socket.close();  
  }, [dispatch]);

  return (
   /*  <Router>
   
      {auth.accesstoken && <SocketClient />}
      <div>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={auth.accesstoken ? Home : Login} />
        <Route
          exact
          path="/conversation"
          component={auth.accesstoken ? Conversation : Login}
        />
        <Route
         
          path="/conversation/:id"
          component={auth.accesstoken ? Conversation : Login}
        />
       
      </div>
    </Router> */

    <BrowserRouter>
       {auth.accesstoken && <SocketClient/>    }
      <Routes>
    
            <Route
              path="/home"
              element={
                <Main>
                  <Home />
                </Main>
              }
            />
 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/conversation"
          element={
            <Main>
              <Conversation />
            </Main>
          }
        />
        <Route
          path="/conversation/:id"
          element={
            <Main>
              <Conversation />
            </Main>
          }
        />
        <Route
          path="/create-schedule"
          element={
            <Main>
              <CreateMeeting />
            </Main>
          }
        />
        <Route
          path="/meeting"
          element={
            <Main>
              <Meeting />
            </Main>
          }
        />
         <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
