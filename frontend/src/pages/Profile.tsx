import { useEffect, useState } from "react"
import { createAddressApi, getAddressAPI, updateAddressApi } from "../api/modules/address.api";
import { toast } from "react-toastify";

interface Address {
    address:string,
    state:string,
    district:string,
    city:string,
    pincode:number | null,
    landmark:string,
}


const Profile = () => {
    const [isEditing,setIsEditing] = useState(false);
    const [isAddressPresent,setIsAddressPresent] = useState(false);
    const [addressData,setAddressData] = useState<Address>({
        address:"",
        state:"",
        district:"",
        city:"",
        pincode:null,
        landmark:"",
    })

    const userData = JSON.parse(localStorage.getItem("userData")|| "null")
    const userId = userData.user_id;

    useEffect(() =>{
        const fetchAddress = async () =>{
            try{
                
                const res = await getAddressAPI();
                console.log(res.data.address);
                setAddressData(res.data.address);
                if(res.data.address.address){
                    setIsAddressPresent(true)
                }
                else{
                    setIsAddressPresent(false)
                }
            }catch(error){
                console.log("No address found error")

            }
        }
        fetchAddress();
    },[]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setAddressData({...addressData,[e.target.name]:e.target.value});
    };


    const handleSubmit = async(e:React.FormEvent) =>{
        e.preventDefault();
        const payload = {
            address:addressData.address,
            state:addressData.state,
            district:addressData.district,
            city:addressData.city,
            landmark:addressData.landmark,
            pincode:addressData.pincode,

        }

        try{
            if(isAddressPresent){
                const res = await createAddressApi(payload);
                toast.success(res.data.message);
            }
            else{
                const res = await updateAddressApi(payload);
                toast.success(res.data.message);
                setIsAddressPresent(true)
                
            }
            setIsEditing(false);
        }catch(error:any){
            console.error(error);
            toast.error(error.response.data.message)
        }
    };

  return (
    <div className="w-full  flex justify-center items-center h">
        <div className="max-w-4xl max-auto flex-1 my-12 bg-white shadow-md rounded-2xl p-6">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                User Profile
            </h1>
            <div className="bg-gray-100 p-4 mb-4 space-y-2 rounded-2xl">
                <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600 w-24">Name:</span>
                    <p className="text-gray-900 font-semibold">{userData.name}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600 w-24">Email:</span>
                    <p className="text-gray-900 font-semibold truncate">{userData.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600 w-24">Phone:</span>
                    <p className="text-gray-900 font-semibold">{userData.phone_number}</p>
                    </div>
                </div>
            </div>

            { !isAddressPresent && !isEditing ? (
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        You haven't added your address yet
                    </p>
                    <button onClick={()=> setIsEditing(true)} className="px-4 py-2 bg-zinc-900 cursor-pointer font-semibold text-white rounded-lg hover:bg-zinc-700 active:bg-zinc-500">
                        Add Address
                    </button>
                </div>

            ):(
                <>
                { !isEditing ?(
                    <div>
                        <div className=" grid grid-cols-2 gap-4 mb-4 text-gray-900">
                            <p> <span className="font-semibold"> Address: </span>{addressData.address} </p>
                            <p> <span className="font-semibold"> State: </span>{addressData.state} </p>
                            <p> <span className="font-semibold"> District: </span>{addressData.district} </p>
                            <p> <span className="font-semibold"> City: </span>{addressData.city} </p>
                            <p> <span className="font-semibold"> Pincode: </span>{addressData.pincode} </p>
                            <p> <span className="font-semibold"> Landmark: </span>{addressData.landmark} </p>
                        </div>

                        <div className="text-center">
                            <button className="px-4 py-2 bg-gray-950 text-white rounded-lg font-semibold hover:bg-gray-700" onClick={()=>setIsEditing(true)}>
                                Edit Address
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {[
                            "address",
                            "state",
                            "district",
                            "city",
                            "pincode",
                            "landmark",
                        ].map((field) => (
                        <div className="mb-2">
                            <label className="block text-gray-950 font-semibold capitalize mb-1"> 
                                {field}
                            </label>
                            <input 
                                type="text"
                                name={field}
                                value={(addressData as any)[field]}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                                required
                            />
                        </div>

                        ))}

                        <div className="flex justify-between mt-6">
                            <button className="px-4 py-2 text-black  font-semibold outline rounded-lg hover:bg-gray-100" onClick={()=>setIsEditing(false)}>
                                Cancel
                            </button>
                            <button type="submit" 
                            className="px-4 py-2 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-800"
                            >
                                {isAddressPresent?"Update":"Save"}
                            </button>

                        </div>
                    </form>


                )}
                </>
            )

            }

        </div>
    </div>

  )
}

export default Profile