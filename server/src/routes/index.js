import authRoute from "./authRoute";
import express from "express";
import userRoute from "./userRoute";
import messageRoute from "./messageRoute";

const appRouter = express.Router();


appRouter.use("/auth",authRoute);
appRouter.use("/user",userRoute);
appRouter.use("/api",messageRoute);

export default appRouter;