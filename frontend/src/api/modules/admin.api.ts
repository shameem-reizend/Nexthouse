import axiosInstance from "../axios/axiosInstance"

export const fetchAllUsersForAdminAPI = async () => {
    const response = await axiosInstance.get('/user/allUsers');
    return response.data;
}


export const fetchAllProductsForAdminAPI = async () => {
    const response = await axiosInstance.get('/admin/products');
    return response.data;
}