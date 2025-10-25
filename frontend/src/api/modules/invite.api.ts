import axiosInstance from "../axios/axiosInstance"

export const fetchInvitationsApi=async()=>{
    const response=await axiosInstance.get("/invite")
    return response.data
}