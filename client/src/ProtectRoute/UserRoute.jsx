import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function UserRoute() {
     const { auth } = useSelector(state => state)
     const firstLogin = localStorage.getItem("firstLogin");

     if (firstLogin || auth.accesstoken) {
          return <Navigate to="/home" />
     }
     return <Navigate to="/login" />;
/*   return <div>UserRoute</div>; */

}
