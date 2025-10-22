import { Request, Response, NextFunction } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventByCreatorId,
  getEventByEventId,
} from "../services/event.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const handleCreateEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { event_name, event_description, event_date, event_venue } = req.body;

    const result = await createEvent(
      event_name,
      event_description,
      event_date,
      event_venue,
      userId
    );

    res.status(200).json({
      success: true,
      message: "Event created successfully",
      event: result,
    });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { event_id } = req.params;

    const result = await deleteEvent(event_id);

    res.status(200).json({
      success: true,
      message: "Event deleted Successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetEventByCreatorId = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const result = await getEventByCreatorId(userId);

    res.status(200).json({
      success: true,
      message: "Event Fetched Successfully",
      events: result,
    });
  } catch (error) {
    next(error);
  }
};


export const handleGetEventByEventId = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const {event_id} = req.params;

    const result = await getEventByEventId(event_id);
    
    res.status(200).json({
      success:true,
      message:"Event fetched Successfully",
      event:result
    })

  }catch(error){
    next(error)
  }
}

export const handleGetAllEvents = async(req:Request,res:Response,next:NextFunction) => {
  try{

    const result = await getAllEvents();

    res.status(200).json({
      success:true,
      message:"Fetched all events",
      events:result
    })


  }catch(error){
    next(error);
  }
}
