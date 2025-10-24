import axiosInstance from "../axios/axiosInstance"

export const fetchCategoryApi=()=>{
    return axiosInstance.get('/category')
}