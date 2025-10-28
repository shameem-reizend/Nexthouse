import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User.entity";

const userRepo = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return await userRepo.find({where: {role: UserRole.USER},relations:['invites','invites.event']});
}