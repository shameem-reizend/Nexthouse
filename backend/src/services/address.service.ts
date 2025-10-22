import { AppDataSource } from "../config/data-source"
import { Address } from "../entities/Address.entity"
import { ApiError } from "../utils/apiError";

const addressRepo = AppDataSource.getRepository(Address);

export const createOrUpdateAddress = async(
    state:string,
    district:string,
    city:string,
    pincode:number,
    landmark:string,
    userId:string,
) =>{

    
    const address =  await addressRepo.findOne({where:{address_id:userId}})
    if(!address){
        throw new ApiError("Address Not found ",400);
    }

    address.state = state
    address.district = district
    address.city = city
    address.pincode = pincode
    address.landmark = landmark

    return await addressRepo.save(address);

}