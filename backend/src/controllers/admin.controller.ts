import { NextFunction,Response,Request } from "express"
import { getAllProductsForAdmin } from "../services/admin.service";

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

