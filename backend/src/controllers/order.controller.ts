
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { completeOrder, createOrder, getOrderOfBuyer, getOrders } from "../services/order.service";

export const handleCreateOrder = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const userId = req.user?.id;
        const {product_id} = req.body;

        const result = await createOrder(userId,product_id);

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


export const handleCompleteOrder = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const {orderId} = req.body;
        console.log(orderId)

        const result = await completeOrder(orderId);

        res.status(200).json({
            success:true,
            message:"Order Soldout successfully",
            result:result

        })

    }catch(error){
        next(error);
    }
}