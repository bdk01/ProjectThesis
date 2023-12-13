import express from "express";
import groupsCtrl from "../controllers/groupsCtrl";
import { auth } from "../middleware/auth";
const groupRoute = express.Router();

groupRoute.post("/create-event",auth, groupsCtrl.createEvent);
groupRoute.get("/search", auth, groupsCtrl.searchEvent);
groupRoute.post("/findOrCreate-Conversation", auth, groupsCtrl.findOrCreateConversation);



     
export default groupRoute;
