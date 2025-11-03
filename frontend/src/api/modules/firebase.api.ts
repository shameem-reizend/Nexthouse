import axiosInstance from "../axios/axiosInstance"

export const saveToken = async (fcm_token: string) => {
    const response = await axiosInstance.post('firebase/save-fcm-token', {fcm_token});
    return response.data
}

export const deleteToken = async () => {
    const response = await axiosInstance.delete('firebase/remove-fcm-token');
    return response.data
}