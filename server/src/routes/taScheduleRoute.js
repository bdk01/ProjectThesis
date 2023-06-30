import express from "express";
import taScheduleCtrl from "../controllers/taScheduleCtrl";
import { auth } from "../middleware/auth";
const taScheduleRoute = express.Router();

taScheduleRoute.post("/create-taSchedule",auth, taScheduleCtrl.createTaSchedule);
taScheduleRoute.post("/apply-taSchedule/:id",auth, taScheduleCtrl.applyTaSchedule);
taScheduleRoute.get("/taSchedules", taScheduleCtrl.getTaSchedules);
taScheduleRoute.get("/taSchedule/:id",auth, taScheduleCtrl.getTaSchedule);
taScheduleRoute.delete("/taSchedule/:id",auth, taScheduleCtrl.deleteTaSchedule);
/* taScheduleRoute.patch("/taSchedule/:id",auth, taScheduleCtrl.deleteTaSchedule); */



     
export default taScheduleRoute;
