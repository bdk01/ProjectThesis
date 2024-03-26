import express from "express";
import postCtrl from "../controllers/postCtrl";
import { auth } from "../middleware/auth";
import { authAdmin } from "../middleware/authAdmin";
const postRoute = express.Router();

postRoute.post("/create-post",auth, postCtrl.createPost);

postRoute.post("/update-post/:id",auth, postCtrl.updatePost);
postRoute.post("/post/:id/like",auth, postCtrl.likePost);
postRoute.post("/post/:id/reportPost",auth, postCtrl.reportPost);
postRoute.post("/post/:id/unlike",auth, postCtrl.unLikePost);
postRoute.get("/get-posts",auth, postCtrl.getPosts);
postRoute.get("/getMonthlyPost", postCtrl.getMonthlyPost);
postRoute.get("/user_posts/:id",auth, postCtrl.getUserPosts);
postRoute.get("/get-post/:id",auth, postCtrl.getPost);
postRoute.delete("/post/:id",auth, postCtrl.deletePost);
postRoute.patch("/savePost/:id",auth, postCtrl.savePost);
postRoute.patch("/unSavePost/:id",auth, postCtrl.unSavePost);
postRoute.get("/get-save-post",auth, postCtrl.getSavePosts);
postRoute.get("/get-discover-post",auth, postCtrl.getPostsDicover);
postRoute.get("/get-All-post", postCtrl.getAllPost);
postRoute.get("/get-number-all", postCtrl.getNumberOfAll);

     
export default postRoute;
