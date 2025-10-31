import axiosInstance from "../axios/axiosInstance"

export const fetchAllUsersAPI = async () => {
    const response = await axiosInstance.get('/user/all');
    return response.data;
}

