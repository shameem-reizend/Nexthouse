import axiosInstance from "../axios/axiosInstance";

export const likedApi = async (product_id:string) => {
  const response = await axiosInstance.post("/liked",{ product_id});
  return response.data;
};
