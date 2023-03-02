import React, { useEffect, useRef, useState } from "react";
/* import Footer from "../Footer/Footer"; */
import Header from "../Header/Header";
import {  Tabs } from "antd";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import SocketClient from "../../SocketClient";
import { getSocket } from "../../redux/socketSlice";

export const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch()
       const { auth} = useSelector((state) => state);
 
  const history = useHistory()
/*    const navigate = useNavigate(); */
    const [key, setKey] = useState("");
    // Handle status
   function handleTabs(key) {
    setKey(key);
    /* navigate(`/${key}`); */ history.push(`/${key}`)
  }
 
  const items = [
    
      {label:"Home" ,key:""},
      {label:"Chat" ,key:"conversation"},
      {label:"Meeting" ,key:"meeting"},
      {label:"Calendar" ,key:"calendar"},

    
  ]
  return (
    <div className="">
    
      <div className="">
      <div className="mb-1">
        <Header />
      </div>

       <Tabs
            defaultActiveKey={key}
            onChange={handleTabs}
            centered
            size="large"
            tabPosition="top"
            type="line"
            className=" px-2 lg:px-6"
            tabBarStyle={{ color: "#ffbb00" }}
            items={items}
          >
     
          </Tabs>
      <main className="main">{children}</main>
      </div>

    {/*   <footer className="footer">
           <Footer/>
      </footer> */}
    </div>
  );
};