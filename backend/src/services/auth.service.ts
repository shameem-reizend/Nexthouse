import { AppDataSource } from "../config/data-source"
import { Address } from "../entities/Address.entity";
import { User } from "../entities/User.entity"
import { ApiError } from "../utils/apiError";
import bcrypt, { compare } from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/token";


const userRepo = AppDataSource.getRepository(User);
const addressRepo = AppDataSource.getRepository(Address);

export const registerUser = async (name:string,email:string,password:string,phone_number:string) => {

    const existing = await userRepo.findOneBy({email});

    if(existing){
        throw new ApiError("Email already exists",401)
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = userRepo.create({
        name:name,
        email:email,
        password:hashPassword,
        phone_number:phone_number,
        
    });

    await userRepo.save(user);
    const address = addressRepo.create({user});
    await addressRepo.save(address);
    
}

export const login = async(email:string,password:string) =>{

    const userFound = await userRepo.findOneBy({email:email});
    if(!userFound){
        throw new ApiError("Invlaid Credentials",400)
    }
    const check = compare(password,userFound.password);

    if(!check){
        throw new ApiError("Invalid credentials",400)
    }

    const payload = {id:userFound.user_id,email:userFound.email,role:userFound.role}

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {userFound,tokens:{accessToken,refreshToken}};

}