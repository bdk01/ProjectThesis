import express from "express";
import userCtrl from "../controllers/userCtrl";

const userRoute = express.Router();

userRoute.get("/search", userCtrl.searchUser);
userRoute.post("/resetpassword", userCtrl.resetPassword);

export default userRoute;
