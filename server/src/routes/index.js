import authRoute from "./authRoute";
import express from "express";
import userRoute from "./userRoute";
import messageRoute from "./messageRoute";
import eventScheduleRoute from "./eventScheduleRoute";
import meetingRoute from "./meetingRoute";
import uploadRoute from "./uploadRoute";
import postRoute from "./postRoute";
import commentRoute from "./commentRoute";
import notifyRoute from "./notifyRoute";
import subjectRoute from "./subjectRoute";
import taScheduleRoute from "./taScheduleRoute";


const appRouter = express.Router();


appRouter.use("/auth",authRoute);
appRouter.use("/api",userRoute);
appRouter.use("/api",messageRoute);
appRouter.use("/api",eventScheduleRoute);
appRouter.use("/api",meetingRoute);
appRouter.use("/api",uploadRoute);
appRouter.use("/api",postRoute);
appRouter.use("/api",notifyRoute);
appRouter.use("/api",commentRoute);
appRouter.use("/api",subjectRoute);
appRouter.use("/api",taScheduleRoute);

export default appRouter;