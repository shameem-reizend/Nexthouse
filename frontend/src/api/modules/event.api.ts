import axiosInstance from "../axios/axiosInstance";

export const fetchEventAPI = async () => {
  const response = await axiosInstance.get("/events");
  return response.data;
};

export const createEventAPI = async (formData: object) => {
  const response = await axiosInstance.post("/events", formData);
  return response.data;
}

export const fetchAllEventsAPI=async()=>{
  const response= await axiosInstance.get('/events/allEvents')
  return response.data;
}

export const deleteEventAPI=async(eventId:string)=>{
  const response= await axiosInstance.delete(`/events/${eventId}`)
  return response.data;
}