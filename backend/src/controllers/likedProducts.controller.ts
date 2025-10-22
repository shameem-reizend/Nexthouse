import { AuthRequest } from "../middlewares/auth.middleware"
import {NextFunction, Response } from "express";
import { getProductById } from "../services/product.service";
import { getUserById, getUserLikedProducts } from "../services/auth.service";
import { LikedProducts } from "../entities/LikedProducts.entity";
import { addToLikeProduct, deleteFromLikedProduct, findLikedProductOfUser } from "../services/likedProduct.service";
import { ApiError } from "../utils/apiError";

export const addToLikeHandler=async(req:AuthRequest,res:Response,next:NextFunction)=>{

    try {
        const {product_id}=req.body
        const user_id=req.user.id 

        const product=await getProductById(product_id)
        const user=await getUserById(user_id)
        const existing=await findLikedProductOfUser(user_id,product_id)
        if(existing){
            throw new ApiError("The product is already in liked list",400)
        }
       const likedProduct=await addToLikeProduct(user,product)
        return res.status(201).json({success:true,message:"Added to Liked",data:likedProduct})
    } catch (error) {
        next(error)
    }
}


export const fetchAllLikedProducts=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try{
        const user_id=req.user.id
        const likedProducts=await getUserLikedProducts(user_id)
        return res.status(200).json({success:true,message:"Fetched Liked Product",data:likedProducts})
    }
    catch(error){
        next(error)
    }
}


export const deleteFromLikedHandler=async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const {product_id}=req.body
        const user_id=req.user.id
        
        const deleted=await deleteFromLikedProduct(user_id,product_id)
        console.log(deleted)
        return res.status(200).json({success:true,message:"Deleted successfully",data:deleted})
        


    } catch (error) {
        next(error)
    }
}