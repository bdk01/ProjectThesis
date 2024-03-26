import express from "express";

import { auth } from "../middleware/auth";
import taEnrollmentCtrl from "../controllers/taEnrollmentCtrl";
const taEnrollmentRoute = express.Router();

taEnrollmentRoute.post("/create-taSchedule",auth, taEnrollmentCtrl.createTaSchedule);
taEnrollmentRoute.post("/apply-taSchedule/:id",auth, taEnrollmentCtrl.applyTaSchedule);
taEnrollmentRoute.post("/edit-taSchedule/:id",auth, taEnrollmentCtrl.editEnrollment);
taEnrollmentRoute.get("/taSchedules", taEnrollmentCtrl.getTaSchedules);
taEnrollmentRoute.get("/taSchedules/:id", taEnrollmentCtrl.getManageTaSchedules);
taEnrollmentRoute.get("/taSchedule/:id",auth, taEnrollmentCtrl.getTaSchedule);
taEnrollmentRoute.get("/taScheduleEdit/:id",auth, taEnrollmentCtrl.getTaEnrollmentEdit);
taEnrollmentRoute.delete("/taSchedule/:id",auth, taEnrollmentCtrl.deleteTaSchedule);

/* taEnrollment.patch("/taSchedule/:id",auth, taScheduleCtrl.deleteTaSchedule); */



     
export default taEnrollmentRoute;
