import express from "express";
import messageCtrl from "../controllers/messageCtrl";
import { auth } from "../middleware/auth";

const messageRoute = express.Router();

messageRoute.post("/message",auth,  messageCtrl.createMessage);

messageRoute.get("/conversations", auth, messageCtrl.getConversations);
messageRoute.post("/create-conversation", auth, messageCtrl.createConversation);
messageRoute.get("/message/:id", auth, messageCtrl.getMessage);
messageRoute.get("/messages/:id", auth, messageCtrl.getMessages);


messageRoute.delete("/message/:id", auth, messageCtrl.deleteMessages);

messageRoute.delete("/conversation/:id", auth, messageCtrl.deleteConversation);



export default messageRoute;
