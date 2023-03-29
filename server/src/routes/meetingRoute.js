import express from "express";
import meetingCtrl from "../controllers/meetingCtrl";

const meetingRoute = express.Router();
meetingRoute.get("/get-token", meetingCtrl.getToken);
meetingRoute.post("/create-meeting", meetingCtrl.createMeeting);
meetingRoute.post("/validate-meeting", meetingCtrl.validateMeeting);


export default meetingRoute;
