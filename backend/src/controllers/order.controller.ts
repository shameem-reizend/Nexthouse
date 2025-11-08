
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { completeOrder, createOrder, findOrderById, getOrderOfBuyer, getOrders, rejectOrder } from "../services/order.service";
import { Auth } from "typeorm";
import { truncate } from "fs";
import { findTokenByUser } from "../services/firebase.service";
import { ApiError } from "../utils/apiError";
import { fcm } from "../firebase/firebaseAdmin.js";

export const handleCreateOrder = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const userId = req.user?.id;
        const {product_id,exchange_product_id} = req.body;

        const result = await createOrder(userId,product_id,exchange_product_id);

        res.status(200).json({
            success:true,
            message:"Order created Successfully ",
            order:result
        })

    }catch(error){
        next(error);

    }
}
// for the owners to get their orders 
export const handleGetOrders = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const ownerId = req.user?.id;

        const result = await getOrders(ownerId);
        
        res.status(200).json({
            success:true,
            message:"Orders fetched successfully",
            orders:result
            })

    }catch(error){
        next(error)

    }
}

// for buyers to get their orders 
export const handleGetOrderOfBuyer = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{

        const buyerId = req.user?.id;

        const result = await getOrderOfBuyer(buyerId);

        res.status(200).json({
            success:true,
            message:"Orders Fetched Successfully",
            orders:result
        })

    }catch(error){
        next(error);
    }

}


export const handleCompleteOrder = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const {orderId} = req.body;
        const userId = req.user.id;

        const order = await findOrderById(orderId);
        const fcmToken = await findTokenByUser(order.buyer.user_id);

        if (!order || !order.buyer) {
            throw new ApiError("Order not found or buyer missing", 404);
        }

        const result = await completeOrder(orderId,userId);

        if(!fcmToken.fcm_token){
            throw new ApiError("User has no fcm token", 404);
        }

        const message = {
            token: fcmToken.fcm_token,
            notification: {
                title: "Order Approved",
                body: `Your order #${orderId} has been approved.`
            },
            data: {
                orderId: orderId.toString(),
                type: "order_status"
            }
        };


        const response = await fcm.send(message);
        console.log("Notification sent",response);

        res.status(200).json({
            success:true,
            message:"Order Soldout successfully",
            result:result

        })

    }catch(error){
        next(error);
    }
}


export const handleRejectOrder = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const {orderId} = req.body;
        const userId  = req.user.id;

        const order = await findOrderById(orderId);
        const fcmToken = await findTokenByUser(order.buyer.user_id);
        console.log(fcmToken)

        if (!order || !order.buyer) {
            throw new ApiError("Order not found or buyer missing", 404);
        }

        const result = await rejectOrder(userId,orderId);

         if(!fcmToken.fcm_token){
            throw new ApiError("User has no fcm token", 404);
        }

        const message = {
            token: fcmToken.fcm_token,
            notification: {
                title: "Order Rejected",
                body: `Your order #${orderId} has been rejected.`
            },
            data: {
                orderId: orderId.toString(),
                type: "order_status"
            }
        };


        const response = await fcm.send(message);
        console.log("Notification sent",response);

        res.status(200).json({
            success:true,
            message:"Order rejected",
            result:result
        })

    }catch(error){
        next(error);
    }
}