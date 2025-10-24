import axiosInstance from "../axios/axiosInstance";

export const fetchEventAPI = async () => {
  const response = await axiosInstance.get("/events");
  return response.data;
};

export const createEventAPI = async (formData: object) => {
  const response = await axiosInstance.post("/events", formData);
  return response.data;
}