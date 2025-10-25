import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { createInviteHandler, getAllInvitationOfUserHandler } from "../controllers/invite.controller";

const inviteRoutes = Router();
inviteRoutes.use(authenticate);

inviteRoutes.post("/", createInviteHandler);
inviteRoutes.get("/",getAllInvitationOfUserHandler)

export default inviteRoutes;
