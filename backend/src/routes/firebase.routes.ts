import { Router } from "express";
import { deleteFirebaseToken, saveFirebaseToken } from "../controllers/firebase.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);

router.post('/save-fcm-token', saveFirebaseToken);
router.delete('/remove-fcm-token', deleteFirebaseToken);

export default router;