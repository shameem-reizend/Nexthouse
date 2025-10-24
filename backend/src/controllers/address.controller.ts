import {Request, NextFunction ,Response} from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {  createOrUpdateAddress, getAddress } from "../services/address.service";


export const handleCreateAddress = async(req:AuthRequest,res:Response,next:NextFunction) => {
    try{
        const userId = req.user.id;
        const {address,state,district,city,pincode,landmark} = req.body;
        const result =await  createOrUpdateAddress(address ,state,district,city,pincode,landmark,userId);

        res.status(200).json({
            success:true,
            message:"Address Added successfully",
            address:result           
        })

    }catch(error){
        next(error);
    }
}

export const handleAddressUpdate = async(req:AuthRequest,res:Response,next:NextFunction) =>{
    try {
        const {address,state,district,city,pincode,landmark} = req.body;
        const userId = req.user.id;

        const result = await createOrUpdateAddress(address,state,district,city,pincode,landmark,userId);

        res.status(200).json({
            success:true,
            message:"Address Updated Successfully",
            address:result
        })
        
    } catch (error) {
        next(error);
    }
}

export const handleGetAddress = async (req:AuthRequest,res:Response,next:NextFunction) =>{
    try{
        const addressId = req.user.id;

        const result = await getAddress(addressId);
        
        res.status(200).json({
            success:true,
            message:"Address fetched",
            address:result
        })

    }catch(error){
        next(error);
    }
}