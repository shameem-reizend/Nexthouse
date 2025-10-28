import axiosInstance from "../axios/axiosInstance"

export const createOrderAPI = async (formData: object) => {
    const response = await axiosInstance.post('/order', formData);
    return response.data;
}