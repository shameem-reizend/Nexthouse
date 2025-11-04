import axiosInstance from "../axios/axiosInstance"

export const fetchCategoryApi=async()=>{
    return await axiosInstance.get('/category')
}

export const AddCategoryAPI=async(formdata:object)=>{
    const response= await axiosInstance.post('/category',formdata);
    return response.data
}

export const  deleteCategoryAPI=async(category_id:string)=>{
    const response= await axiosInstance.delete(`/category/${category_id}`);
    return response.data
}