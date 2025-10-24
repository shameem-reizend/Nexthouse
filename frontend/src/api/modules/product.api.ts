import axiosInstance from "../axios/axiosInstance";

export const fetchProductsApi = async () => {
  const response = await axiosInstance.get("/product");
  return response;
};
