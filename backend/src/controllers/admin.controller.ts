import { NextFunction,Response,Request } from "express"
import { getAllEventsForAdmin, getAllOrdersForAdmin, getAllProductsForAdmin } from "../services/admin.service";

export const handleGetAllProductsForAdmin = async(req:Request,res:Response,next:NextFunction) =>{
    try{
        const result =  await getAllProductsForAdmin();
        res.status(200).json({
            success:true,
            message:"Products fetched",
            products:result
        })

    }catch(error){
        next(error)
    }
}

export const handleGetAllEventsForAdmin = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const result = await getAllEventsForAdmin();

        res.status(200).json({
            success:true,
            message:"Events fetched ",
            events:result
        })

    }catch(error){
        next(error)
    }
}

export const handleGetAllOrdersForAdmin = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const result = await getAllOrdersForAdmin();

        res.status(200).json({
            success:true,
            message:"Orders fetched ",
            orders:result
        })

    }catch(error){
        next(error)
    }
}


