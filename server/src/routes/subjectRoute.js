import express from "express";
import subjectCtrl from "../controllers/subjectCtrl";
import { auth } from "../middleware/auth";
const subjectRoute = express.Router();

subjectRoute.post("/create-subject",auth, subjectCtrl.createSubject);
subjectRoute.get("/getTeacherTa/:id", subjectCtrl.getTeacherTa);
subjectRoute.get("/subject/search", subjectCtrl.getSubject);
subjectRoute.get("/getAllTa", subjectCtrl.getAllTa);
subjectRoute.get("/getAllSubject", subjectCtrl.getAllSubject);
subjectRoute.post("/update-subject", subjectCtrl.updateSubject);
subjectRoute.delete('/delete-subject/:id', auth, subjectCtrl.deleteSubject)
subjectRoute.patch("/approve-ta",auth, subjectCtrl.approvalTA);



     
export default subjectRoute;
