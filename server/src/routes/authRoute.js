import express from "express";
import authCtrl from "../controllers/authCtrl";

const authRoute = express.Router();

authRoute.post("/register", authCtrl.register);
authRoute.post("/login", authCtrl.login);
authRoute.post("/logout", authCtrl.logout);
authRoute.post("/refresh_token", authCtrl.refreshToken);


     
export default authRoute;
