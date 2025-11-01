import { AppDataSource } from "../config/data-source"
import { Event } from "../entities/Event.entity";
import { User } from "../entities/User.entity";
import { ApiError } from "../utils/apiError";


const eventRepo = AppDataSource.getRepository(Event);
const userRepo = AppDataSource.getRepository(User);



export const createEvent = async (event_name:string,event_description:string,event_date:Date,event_venue:string,userId:string)=>{

    const user = await userRepo.findOne({where:{user_id:userId}})
    if(!user){
        throw new ApiError("User not found",400);
    }

    const newEvent = eventRepo.create({
        event_name,
        event_description,
        event_date,
        event_venue,
        createdBy:user
    })
     return await eventRepo.save(newEvent)

}

export const deleteEvent = async(event_id:string)=> {

    const event =  await eventRepo.findOne({where:{event_id:event_id}});

    if(!event){
        throw new ApiError("Event not found",400);
    }

    await eventRepo.delete(event.event_id)

    return event;
}


export const getEventByCreatorId = async(userId:string) => {

    const creator =  await userRepo.findOne({where:{user_id:userId}});

    if(!creator){
        throw new ApiError("User not found",400);
    }

    const events = eventRepo.find({
        where:{createdBy:creator},
    })

    return events;

}


export const getEventByEventId = async(event_id:string) => {

    const event = await eventRepo.findOne({where:{event_id:event_id}})
    if(!event){
        throw new ApiError("The event cannot be found",404)
    }
    return event
}


export const getAllEvents = async() => {
    const events = await eventRepo.find({relations:['createdBy'],select:{
        createdBy:{
            user_id:true,
            name:true,
            email:true
        }
        
    }});
    return events;
}