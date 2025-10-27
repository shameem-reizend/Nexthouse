import axiosInstance from "../axios/axiosInstance"

export const fetchInvitationsApi=async()=>{
    const response=await axiosInstance.get("/invite")
    return response.data
}

export const createInviteAPI = async (formData: object) => {
    const response = await axiosInstance.post('/invite', formData);
    return response.data;
}