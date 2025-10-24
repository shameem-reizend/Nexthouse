import axiosInstance from "../axios/axiosInstance";

export const fetchEventAPI = async () => {
  const response = await axiosInstance.get("/events");
  return response.data;
};