import axiosInstance from "../axios/axiosInstance";

export const getAddressAPI = async() => {
    const response = await axiosInstance.get("/address");
    return response;
}

export const createAddressApi = async( addressData:object) =>{
    const response = await axiosInstance.post('/address' ,addressData);
    return response;
}

export const updateAddressApi = async( addressData:object) =>{
    const response = await axiosInstance.put('/address',addressData);
    return response;
}