
import { GetRefreshToken, loginFailure, loginStart, loginSuccess, logOut } from "../redux/authSlice";
import { logOutSocket } from "../redux/socketSlice";
import axios from "../axios"

export const LoginandNavigateUser =async (dispatch,data) =>{
     dispatch(loginStart());
     try{
          dispatch(loginSuccess(data));

          localStorage.setItem("firstLogin", true);
     }
     catch(err){
          dispatch(loginFailure())
     }

}
export const Logout =async (dispatch) =>{
     try{
         dispatch(logOut());
        
        /*   dispatch(logOutSocket())  */
        await axios.post("/auth/logout");
        console.log("logout r")
        window.location.href = "/";
        localStorage.removeItem('firstLogin')
     }
     catch(err){
         
     }

}
export const refreshToken = async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
       try{
            const data = await axios.post("/auth/refresh_token");
            dispatch(GetRefreshToken(data.data));
         
     }
     catch(err){
          console.log(err)
     }

  }
};