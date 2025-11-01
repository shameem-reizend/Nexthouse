import { Request, Response, NextFunction } from "express";
import { addProfilePicture, getAddressOfUser, getAllUsers, getAllUsersForAdmin, getProfilePic } from "../services/user.service";
import { instanceToPlain } from "class-transformer";
import { AuthRequest } from "../middlewares/auth.middleware";

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

export const handleAddProfilePicture = async (req:AuthRequest,res:Response,next:NextFunction) => {
  try{
    const image = (req.file as any)?.path;
    const userId = req.user?.id;

    const result =  await addProfilePicture(userId,image);

    res.status(200).json({
      success:true,
      messages:"Profile Picture added",
      image
    })
    
  }catch(error){
    next(error);
  }
}

export const handleGetProfilePic = async(req:AuthRequest,res:Response,next:NextFunction) =>{
  try{
    const userId = req.user?.id
    const result = await getProfilePic(userId);

    res.status(200).json({
      success:true,
      message:"ProfilePic fetched",
      image:result
    })

  }catch(error){
    next(error);
  }
}


export const getUserAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {

  try {
    const {id}=req.user
    const users = await getAddressOfUser(id);
    
    res.status(200).json({
      success: true,
      message: 'User address fetched successfully',
      user: instanceToPlain(users)
    })

  } catch (error) {
    next(error)
  }
}