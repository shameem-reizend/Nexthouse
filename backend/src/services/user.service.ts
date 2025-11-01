import { log } from "console";
import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User.entity";
import { ApiError } from "../utils/apiError";

const userRepo = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return await userRepo.find({where: {role: UserRole.USER},relations:['invites','invites.event']});
}
export const getAllUsersForAdmin = async() =>{
  
  const user = await userRepo.find({where:{role:UserRole.USER},select:{name:true,email:true,phone_number:true}});
  return user;

}

export const addProfilePicture = async(userId:string,image:string) =>{

  const user =  await userRepo.findOneBy({user_id:userId});

  if(!user){
    throw new ApiError("User Not found",400);
  }

  user.profile_pic = image;

  return await userRepo.save(user);

}


export const getProfilePic = async(userId:string)=>{

  const image = userRepo.findOne({where:{user_id:userId},select:{
    profile_pic:true
  }});

  return image;

}

export const getAddressOfUser=async(user_id:string)=>{
 const user= await userRepo.createQueryBuilder("user").leftJoin("user.address","address").addSelect(["address.latitude","address.longitude"]).where("user.user_id=:user_id",{user_id}).getOne();
 return user
}