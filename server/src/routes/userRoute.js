import express from "express";
import userCtrl from "../controllers/userCtrl";

const userRoute = express.Router();

userRoute.get("/search", userCtrl.searchUser);
userRoute.get("/searchAll", userCtrl.searchAllUser);
userRoute.get("/:id", userCtrl.getUser);
userRoute.post("/resetpassword", userCtrl.resetPassword);

export default userRoute;
