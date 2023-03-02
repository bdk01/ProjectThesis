import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { DefaultLayout } from "./components/DefaultLayout/DefaultLayout";
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
    <Router>
      {auth.accesstoken && <DefaultLayout />}
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
    </Router>

    /*  <BrowserRouter>
      <Routes>
 
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />
        {isAuth && <Route  element={<SocketClient />} >
        
        
        </Route>
        
        }
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/conversation"
          element={
            <DefaultLayout>
              <Conversation />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  */
  );
}

export default App;
