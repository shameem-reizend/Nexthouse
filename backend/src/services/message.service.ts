import { log } from "console";
import { AppDataSource } from "../config/data-source";
import { Message } from "../entities/Message.enitity";
import { User } from "../entities/User.entity";
import { getReceiverSocketId, io } from "../socket";
import { ApiError } from "../utils/apiError";

const userRepo = AppDataSource.getRepository(User);
const messageRepo = AppDataSource.getRepository(Message)


export const sendMessage = async(message:string,senderId:string, receiverId:string)=>{

        const sender = await userRepo.findOne({where:{user_id:senderId}})
        console.log(sender)
        if(!sender){
            throw new ApiError("Sender not found",404);
        }

        const receiver =  await userRepo.findOne({where:{user_id:receiverId}})
        console.log(receiver)
        
        if(!receiver){
            throw new ApiError("Recepient Not Found ",404);
        }

        const newMessage = messageRepo.create({
            sender:sender,
            receiver:receiver,
            message:message
        })
         await messageRepo.save(newMessage);
        // console.log(newMessage)

        const targetSocket = getReceiverSocketId(receiverId);
        // const socketids = Array.from(receiverSocketId)
        console.log(targetSocket)

        if(targetSocket){
            console.log("message sending...",message);
            targetSocket.forEach(socketId => {  
                io.to(socketId).emit("message", {
                    from:senderId,
                    newMessage:newMessage
                });
            });
        }

}

export const getMessage = async(senderId:string, receiverId:string) => {

    const sender =  await userRepo.findOne({where:{user_id:senderId}});
    if(!sender){
        throw new ApiError("User not found ",404);
    }
    const  receiver = await userRepo.findOne({where:{user_id:receiverId}})

    if(!receiver){
        throw new ApiError("receiver not found ",404);
    }

    const messages = await messageRepo.find({
        where:[
            {sender:{user_id:senderId},receiver:{user_id:receiverId}},
            {sender:{user_id:receiverId},receiver:{user_id:senderId}}
        ],
        relations:["sender","receiver"],
        order:{created_at:"ASC"}
    })

    return messages;

}