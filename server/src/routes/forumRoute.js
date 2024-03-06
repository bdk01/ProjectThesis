import express from "express";
import forumCtrl from "../controllers/forumCtrl";
import { auth } from "../middleware/auth";
const forumRoute = express.Router();

forumRoute.get("/Allforum",auth,forumCtrl.getAllForum);
forumRoute.get("/Allforums",auth,forumCtrl.getForums);
forumRoute.get("/forum/:id",forumCtrl.getForum);
forumRoute.get("/get-forum/posts/:id",forumCtrl.getPostsForum);
forumRoute.get("/checkforum/:id",auth,forumCtrl.checkForum);
forumRoute.post("/accept-join/:id",auth,forumCtrl.acceptJoining);
forumRoute.post("/kickMember/:id",auth,forumCtrl.kickMember);
forumRoute.post("/joinPublic/:id",auth,forumCtrl.joinPublic);
forumRoute.post("/reject-join/:id",auth,forumCtrl.rejectJoining);
forumRoute.post("/requestJoin/:id",auth,forumCtrl.requestJoining);
forumRoute.post("/create-forum", forumCtrl.createForum);
forumRoute.post("/create-forum-post",auth, forumCtrl.createForumPost);
forumRoute.post('/update-forum/:id', forumCtrl.updateForum)
forumRoute.delete('/delete-forum/:id',auth, forumCtrl.deleteForum)

export default forumRoute;
