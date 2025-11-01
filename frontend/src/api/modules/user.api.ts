import axiosInstance from "../axios/axiosInstance";

export const fetchAllUsersAPI = async () => {
  const response = await axiosInstance.get("/user/all");
  return response.data;
};

export const fetchProfilePicAPI = async () => {
  const response = await axiosInstance.get("/user/getProfilePic");
  return response.data;
};

export const addProfilePicAPI = async (image: any) => {
  const response = await axiosInstance.post("/user/addProfilePic", image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
