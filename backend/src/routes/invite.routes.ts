import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createInviteHandler } from "../controllers/invite.controller";

const inviteRoutes = Router();
inviteRoutes.use(authenticate);

inviteRoutes.post("/", createInviteHandler);

export default inviteRoutes;
