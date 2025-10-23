import axiosInstance from "../axios/axiosInstance";

export const registerAPI = async (formData:object) => {
  const response = await axiosInstance.post("/auth/register", formData);
  return response;
};

export const loginAPI = async (formData:object) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response;
};
