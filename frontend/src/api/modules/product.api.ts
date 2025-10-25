import axiosInstance from "../axios/axiosInstance";

export const fetchProductsApi = async () => {
  const response = await axiosInstance.get("/product/buy");
  return response;
};

export const addProductApi=async(category_id:string,formData:object)=>{
const response=await axiosInstance.post(`/product/${category_id}`,formData,{
  headers:{
    "Content-Type": "multipart/form-data",
  }
});
return response;
}

export const fetchUserProductsApi=async()=>{
  const response= await axiosInstance.get('/product/user')
  return response;
}