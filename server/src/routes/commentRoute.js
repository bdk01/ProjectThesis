import express from "express";
import commentCtrl from "../controllers/commentCtrl";
import { auth } from "../middleware/auth";
const commentRoute = express.Router();

commentRoute.post("/create-comment",auth,commentCtrl.createComment);
commentRoute.patch("/comment/:id",auth, commentCtrl.updateComment);

commentRoute.patch("/comment/:id/like",auth, commentCtrl.likeComment);
commentRoute.patch("/comment/:id/unlike",auth, commentCtrl.unLikeComment);
commentRoute.delete("/comment/:id",auth, commentCtrl.deleteComment);

     
export default commentRoute;
