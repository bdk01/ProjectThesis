
import express from "express";
import notifyCtrl from "../controllers/notifyCtrl";
import { auth } from "../middleware/auth";
const notifyRoute = express.Router();

notifyRoute.post('/notify', auth, notifyCtrl.createNotify)

notifyRoute.delete('/notify/:id', auth, notifyCtrl.removeNotify)

notifyRoute.get('/notifies', auth, notifyCtrl.getNotifies)

notifyRoute.patch("/isReadNotify/:id", auth, notifyCtrl.isReadNotify)

notifyRoute.delete('/deleteAllNotify', auth, notifyCtrl.deleteAllNotifies)

export default notifyRoute