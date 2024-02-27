import authRoute from "./authRoute";
import express from "express";
import userRoute from "./userRoute";
import messageRoute from "./messageRoute";


import uploadRoute from "./uploadRoute";
import postRoute from "./postRoute";
import commentRoute from "./commentRoute";
import notifyRoute from "./notifyRoute";
import subjectRoute from "./subjectRoute";
import taEnrollmentRoute from "./taEnrollmentRoute";

import groupRoute from "./groupRoute";
import forumRoute from "./forumRoute";


const appRouter = express.Router();


appRouter.use("/auth",authRoute);
appRouter.use("/api",userRoute);
appRouter.use("/api",messageRoute);
appRouter.use("/api",groupRoute);

appRouter.use("/api",uploadRoute);
appRouter.use("/api",postRoute);
appRouter.use("/api",notifyRoute);
appRouter.use("/api",commentRoute);
appRouter.use("/api",subjectRoute);
appRouter.use("/api",taEnrollmentRoute);
appRouter.use("/api",forumRoute);

export default appRouter;