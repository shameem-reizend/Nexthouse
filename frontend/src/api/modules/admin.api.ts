import axiosInstance from "../axios/axiosInstance"

export const fetchAllUsersForAdminAPI = async () => {
    const response = await axiosInstance.get('/user/allUsers');
    return response.data;
}


export const fetchAllProductsForAdminAPI = async () => {
    const response = await axiosInstance.get('/admin/products');
    return response.data;
}

export const fetchAlleventsForAdminAPI = async () => {
    const response = await axiosInstance.get('/admin/events');
    return response;
}

export const fetchAllOrdersForAdminAPI = async () => {
    const response = await axiosInstance.get('/admin/orders');
    return response;
}