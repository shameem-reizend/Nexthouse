import axiosInstance from "../axios/axiosInstance"

export const sendMessages=async(receiverId:string,message:string)=>{
  const response=await axiosInstance.post(`/message/send/${receiverId}`,{message})
  return response.data
}


export const fetchChatMessage=async(receiverId:string)=>{
  const response=await axiosInstance.get(`/message/all/${receiverId}`)
  return response.data
}