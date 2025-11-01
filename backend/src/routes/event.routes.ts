import { Router } from "express";
import { handleCreateEvent, handleDeleteEvent, handleGetAllEvents, handleGetEventByCreatorId, handleGetEventByEventId } from "../controllers/event.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/body.validator.middleware";
import { eventSchema } from "../validations/event.validation";
import { UserRole } from "../entities/User.entity";


const eventRoutes = Router();
eventRoutes.use(authenticate);

eventRoutes.post("/",authorize(UserRole.USER),validateBody(eventSchema),handleCreateEvent);
eventRoutes.get("/",authorize(UserRole.USER),handleGetEventByCreatorId);
eventRoutes.delete("/:event_id",authorize(UserRole.USER,UserRole.ADMIN),handleDeleteEvent);
eventRoutes.get("/allEvents",authorize(UserRole.ADMIN),handleGetAllEvents);
eventRoutes.get("/event/:event_id",authorize(UserRole.USER),handleGetEventByEventId);

export default eventRoutes;
