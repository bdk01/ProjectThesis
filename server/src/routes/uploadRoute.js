import express from "express";

import { auth } from "../middleware/auth";
import uploadCtrl from "../controllers/uploadCtrl";
const uploadRoute = express.Router();

uploadRoute.post("/upload",auth, uploadCtrl.createUpload);

uploadRoute.post("/destroy-upload",auth, uploadCtrl.destroyUpload);

export default uploadRoute;


