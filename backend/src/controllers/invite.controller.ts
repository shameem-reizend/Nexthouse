import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ApiError } from "../utils/apiError";
import { getUserById } from "../services/auth.service";
import { getEventByEventId } from "../services/event.service";
import { createInvite } from "../services/invite.service";

export const createInviteHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { event_id, reciever_id } = req.body;
    const { id } = req.user;

    if (!reciever_id) {
      throw new ApiError("Bad Request", 400);
    }

    const reciever = await getUserById(reciever_id);
    const sender = await getUserById(id);
    const event = await getEventByEventId(event_id);

    if (!event) {
      throw new ApiError("Event not found", 404);
    }
    const newInvite = await createInvite(event, sender, reciever);

    return res.status(201).json({
        message:"Invite sended",
        success:true,
        data:newInvite
    });
  } catch (error) {
    next(error);
  }
};
