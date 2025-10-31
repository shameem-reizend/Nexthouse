import { Request, Response, NextFunction } from "express";
import { getAllUsers, getAllUsersForAdmin } from "../services/user.service";
import { instanceToPlain } from "class-transformer";

export const getAllUsersHandler = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const users = await getAllUsers();
    
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      users: instanceToPlain(users)
    })

  } catch (error) {
    next(error)
  }
}

export const handleGetAllUsersForAdmin = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const users = await getAllUsersForAdmin();

    res.status(200).json({
      success:true,
      message:"Users fetched successfully",
      users:instanceToPlain(users)
    })

  }catch(error){
    next(error)

  }
}