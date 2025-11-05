import { NextFunction,Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { connectedUsers } from "../socket";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";
import { ApiError } from "../utils/apiError";
import { Message } from "../entities/Message.enitity";
import { getMessage, sendMessage } from "../services/message.service";


const userRepo = AppDataSource.getRepository(User);
const messageRepo = AppDataSource.getRepository(Message)

export const handleSendMessage = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const {message} = req.body;
        const recieverId = req.params?.receiverId;
        const senderId = req.user?.id;
        //         console.log(req.user?.name)
        // console.log(senderId," sender in controllerrrrrrrrrr")
        //         console.log(recieverId,"receiverrrrrrrrr")



        const   result = await sendMessage(message,senderId,recieverId);

        res.status(200).json({
            success:true,
            message:"Message sent",
            newMessage:result

        })
    }catch(error){
        next(error);
    }
}

export const handleGetMessage = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const senderId = req.user?.id;
        const receiverId = req.params.receiverId;

        const result = await getMessage(senderId,receiverId);
        console.log(result);
        

        res.status(200).json({
            success:true,
            message:"fetched the messages",
            totalMessages:result
        })

    }catch(error){
        next(error);
    }
}