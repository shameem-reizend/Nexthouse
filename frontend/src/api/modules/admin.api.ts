import axiosInstance from "../axios/axiosInstance"

export const fetchAllUsersForAdminAPI = async () => {
    const response = await axiosInstance.get('/user/allUsers');
    return response.data;
}


export const fetchAllProductsForAdminAPI = async () => {
    const response = await axiosInstance.get('/admin/products');
    return response.data;
}

export const deleteProductForAdminAPI=async(product_id:string)=>{
    const response=await axiosInstance.delete(`/admin/delete/${product_id}`)
    return response.data
}

export const fetchAdminProductDashoard=async()=>{
    const response=await axiosInstance.get("/admin/product-dashboard")
    return response.data
}