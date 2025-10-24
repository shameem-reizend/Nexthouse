import { AppDataSource } from "../config/data-source"
import { Address } from "../entities/Address.entity"
import { ApiError } from "../utils/apiError";

const addressRepo = AppDataSource.getRepository(Address);

export const createOrUpdateAddress = async(
    address:string,
    state:string,
    district:string,
    city:string,
    pincode:number,
    landmark:string,
    userId:string,
) =>{

    
    const newaddress =  await addressRepo.findOne({where:{address_id:userId}})
    if(!address){
        throw new ApiError("Address Not found ",400);
    }

    newaddress.address = address
    newaddress.state = state
    newaddress.district = district
    newaddress.city = city
    newaddress.pincode = pincode
    newaddress.landmark = landmark

    return await addressRepo.save(newaddress);

}


export const getAddress = async(addressId:string) =>{

    const address = await addressRepo.findOne({where:{address_id:addressId}});

    if(!address){
        throw new ApiError ("Address not found ",400);
    }

    return address;

}