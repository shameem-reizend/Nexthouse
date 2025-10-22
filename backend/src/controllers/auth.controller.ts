import { NextFunction,Request,Response } from "express";
import { login, registerUser } from "../services/auth.service";
import { instanceToPlain } from "class-transformer";


export const handleRegister = async(req:Request,res:Response,next:NextFunction) =>{

    // console.log("hitttt",req.body);
    try{
        const {name,email,password,phone_number} = req.body;

        const user = await registerUser(name,email,password,phone_number);

        return res.status(201).json({
            success:true,
            message:"User Registered Successfully",
            user:instanceToPlain(user)
        })

    }catch(error){
        next(error);
    }

}

export const handleLogin = async(req:Request,res:Response,next:NextFunction) => {

    try{
        const{email,password} = req.body;

        const loginUser = await login(email,password);

        const {tokens:{refreshToken}} = loginUser;

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })

        res.json({
            success:true,
            message:"Login Successful",
            data:{
                user: instanceToPlain(loginUser.userFound),
                token:loginUser.tokens.accessToken
            }

        })
        
    }catch(error){

        next(error)

    }

}