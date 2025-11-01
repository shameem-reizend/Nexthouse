
import { useEffect, useState } from "react";
import {
  addProfilePicAPI,
  fetchProfilePicAPI,
} from "../../api/modules/user.api";
import { User } from "lucide-react";

const UserDetails = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    try {
       setLoading(true);
      await addProfilePicAPI(formData);
      fetchProfilePic();
    } catch (error) {
      console.error("API call failed:", error);
    }finally{
      setLoading(false)
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const fetchProfilePic = async () => {
    try {
      const res = await fetchProfilePicAPI();
      setProfile(res.image.profile_pic);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfilePic();
  }, [profile]);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 p-4 mb-4 space-y-2 justify-evenly items-center rounded-2xl">
      <div className="flex flex-col gap-2 items-center">
        {profile ? (
          <img
            src={profile}
            alt=""
            className="w-30 h-30 rounded-full object-cover border border-gray-400"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <User size={50}/>
          </div>
        )}

        {/* Upload/Edit Button */}
        <label className="cursor-pointer font-semibold border border-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-200">
          {loading? "Uploading...":profile ? "Edit Profile Pic" : "Add Profile Pic"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="space-y-4 mt-3 text-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600 w-24">Name:</span>
          <p className="text-gray-900 font-semibold">{userData.name}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600 w-24">Email:</span>
          <p className="text-gray-900 font-semibold truncate">
            {userData.email}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600 w-24">Phone:</span>
          <p className="text-gray-900 font-semibold">{userData.phone_number}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
