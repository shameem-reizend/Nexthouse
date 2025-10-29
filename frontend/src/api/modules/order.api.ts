import axiosInstance from "../axios/axiosInstance"

export const createOrderAPI = async (formData: object) => {
    const response = await axiosInstance.post('/order', formData);
    return response.data;
}

export const getMyOrdersAPI = async () => {
    const response = await axiosInstance.get('/order/my-orders');
    return response.data;
}

export const getReceivedOrderAPI = async () => {
    const response = await axiosInstance.get('/order');
    return response.data
}

export const makeOrderCompleteAPI = async (FormData: object) => {
    const response = await axiosInstance.patch('/order/order-complete', FormData);
    return response.data
}

export const makeOrderRejectAPI = async (FormData: object) => {
    const response = await axiosInstance.patch('/order/order-reject', FormData);
    return response.data
}