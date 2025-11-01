import { NextFunction,Response,Request } from "express"
import { deleteByProductId, getAdminDasboardResult, getAllProductsForAdmin } from "../services/admin.service";
import { error } from "console";
import { getProductById } from "../services/product.service";
import { date } from "joi";
import { ApiError } from "../utils/apiError";

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



export const handleDeleteProduct=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {product_id}=req.params
    if(!product_id.trim() || !product_id){
        throw new ApiError("Product id cannot be empty",400);
    
    }
    const product=await deleteByProductId(product_id.trim())
    if(product.affected===0){
        throw new ApiError("Product not found",404)
    }
    return res.status(200).json({message:"Successfully deleted",success:true,data:null})
    
    }
    catch(error){
        next(error)
    }
}

export const getAdminProductDashboard=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const result=await getAdminDasboardResult();
        return res.status(200).json({message:"Successful",success:true,data:result})
    } catch (error) {
        next(error)
    }
}