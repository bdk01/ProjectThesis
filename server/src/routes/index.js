import authRoute from "./authRoute";
import express from "express";
import userRoute from "./userRoute";
import messageRoute from "./messageRoute";
import eventScheduleRoute from "./eventScheduleRoute";

const appRouter = express.Router();


appRouter.use("/auth",authRoute);
appRouter.use("/user",userRoute);
appRouter.use("/api",messageRoute);
appRouter.use("/api",eventScheduleRoute);

export default appRouter;