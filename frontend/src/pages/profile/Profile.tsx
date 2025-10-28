import { useEffect, useState } from "react";
import axios from "axios";
import {
  createAddressApi,
  getAddressAPI,
  updateAddressApi,
} from "../../api/modules/address.api";
import { toast } from "react-toastify";

interface Address {
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: number | undefined;
  landmark: string;
}

interface State{
  name: string
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddressPresent, setIsAddressPresent] = useState(false);
  const [stateList ,setStateList] = useState <any[]>([]);
  const [cityList, setcityList] = useState <any[]>([]);
  const [addressData, setAddressData] = useState<Address>({
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: undefined,
    landmark: "",
  });

  const [selectedState, setSelectedState] = useState("");
  const [selectedcity, setSelectedCity] = useState("");
  const [selectedStateName, setSelectedStateName] = useState("");
  const [longitude,setLongitude] = useState("");
  const [latitude,setLatitude] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userId = userData.user_id;
 
  // const API_KEY = 
  const stateOptions = {
  method: 'GET',
  url: 'https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode',
  params: {countrycode: 'in'},
  headers: {
    'x-rapidapi-key': '3bacb4ba8fmsh46cb26a20906562p15539bjsn8a242baca16f',
    'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com'
  }
};

const cityoptions = {
  method: 'GET',
  url: 'https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode',
  params: {
    countrycode: 'in',
    statecode: `${selectedState}`
  },
  headers: {
    'x-rapidapi-key': '3bacb4ba8fmsh46cb26a20906562p15539bjsn8a242baca16f',
    'x-rapidapi-host': 'country-state-city-search-rest-api.p.rapidapi.com'
  }
};

async function fetchStateData() {
	try {
		const response = await axios.request(stateOptions);
    console.log(response.data)
    setStateList(response.data);

	} catch (error) {
		console.error(error);
	}
}

async function fetchCityData() {
	try {
		const response = await axios.request(cityoptions);
		console.log(response.data);
    setcityList(response.data)
	} catch (error) {
		console.error(error);
	}
}




const fetchAddress = async () => {
  try {
    const res = await getAddressAPI();
    // console.log(res.data.address);
    setAddressData(res.data.address);
    if (res.data.address.address) {
      setIsAddressPresent(true);
    } else {
      setIsAddressPresent(false);
    }
  } catch (error) {
    console.log("No address found error");
    toast.error("Error in fetching Address")
  }
};
  useEffect(() => {
    fetchAddress();
  }, []);

  useEffect(()=>{
      fetchStateData();
      fetchCityData();
  },[selectedState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSelectStateChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    const state = stateList.filter((state) => state.isoCode == e.target.value);
    setSelectedStateName(state[0].name);
  };

  const handleSelectCityChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setAddressData({...addressData, [e.target.name]:e.target.value});
    const c = cityList.filter((city) => city.name == e.target.value)
    setLongitude(c[0].longitude);
    setLatitude(c[0].latitude);
    setSelectedCity(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      address: addressData.address,
      state: selectedStateName,
      district: addressData.district,
      city: selectedcity,
      landmark: addressData.landmark,
      pincode: addressData.pincode,
      longitude:longitude,
      latitude:latitude,
    };

    try {
      if (isAddressPresent) {
        const res = await createAddressApi(payload);
        toast.success(res.data.message);
        fetchAddress();
      } else {
        const res = await updateAddressApi(payload);
        toast.success(res.data.message);
        fetchAddress();
        setIsAddressPresent(true);
      }
      setIsEditing(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
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
              <p className="text-gray-900 font-semibold truncate">
                {userData.email}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-600 w-24">Phone:</span>
              <p className="text-gray-900 font-semibold">
                {userData.phone_number}
              </p>
            </div>
          </div>
        </div>

        {!isAddressPresent && !isEditing ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              You haven't added your address yet
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-zinc-900 cursor-pointer font-semibold text-white rounded-lg hover:bg-zinc-700 active:bg-zinc-500"
            >
              Add Address
            </button>
          </div>
        ) : (
          <>
            {!isEditing ? (
              <div>
                <h1 className="text-xl font-semibold text-center mb-3">
                  Address Details
                </h1>
                <div className=" grid grid-cols-2 gap-4 mb-4 text-gray-900">
                  <p className="bg-gray-100 rounded-2xl p-2">
                    {" "}
                    <span className="font-semibold"> Address: </span>
                    {addressData.address}{" "}
                  </p>
                  <p className="bg-gray-100 rounded-2xl p-2">
                    {" "}
                    <span className="font-semibold"> State: </span>
                    {addressData.state}{" "}
                  </p>
                  <p className="bg-gray-100 rounded-2xl p-2">
                    {" "}
                    <span className="font-semibold"> District: </span>
                    {addressData.district}{" "}
                  </p>
                  <p className="bg-gray-100 rounded-2xl p-2">
                    {" "}
                    <span className="font-semibold"> City: </span>
                    {addressData.city}{" "}
                  </p>
                  <p className="bg-gray-100 rounded-2xl p-2">
                    {" "}
                    <span className="font-semibold"> Pincode: </span>
                    {addressData.pincode}{" "}
                  </p>
                  <p className="bg-gray-100 rounded-2xl p-2">
                    {" "}
                    <span className="font-semibold"> Landmark: </span>
                    {addressData.landmark}{" "}
                  </p>
                </div>

                <div className="text-center">
                  <button
                    className="px-4 py-2 bg-gray-950 text-white rounded-lg font-semibold hover:bg-gray-700"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Address
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                  <div className="mb-2">
                    <label className="block text-gray-950 font-semibold capitalize mb-1">
                      address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={addressData.address==null? "":addressData.address}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                      required
                    />
                  </div>
                   <div className="mb-2">
                    <label className="block text-gray-950 font-semibold capitalize mb-1">
                      state
                    </label>
                    <select
                      name="state"
                      value={selectedState}
                      onChange={handleSelectStateChange}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                      required
                    >
                      <option value ="">{addressData.state !== null? addressData.state:"select a state"}</option>
                      {
                        stateList?.map((state:any) => (
                          <option  className="text-black" key ={state.name} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))
                      }
                      </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-950 font-semibold capitalize mb-1">
                      district
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={addressData.district}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-950 font-semibold capitalize mb-1">
                      city
                    </label>
                    <select
                      name="city"
                      value={selectedcity}
                      onChange={handleSelectCityChange}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                      required
                    >
                      <option value ="">{addressData.city != null? addressData.city:"Select city"}</option>
                      {
                        cityList.map((city) => (
                          <option key ={city.name} value={city.name}>
                            {city.name}
                          </option>
                        ))
                      }
                      </select>
                  </div>
                   <div className="mb-2">
                    <label className="block text-gray-950 font-semibold capitalize mb-1">
                      pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={addressData.pincode}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                      required
                    />
                  </div>
                   <div className="mb-2">
                    <label className="block text-gray-950 font-semibold capitalize mb-1">
                      landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={addressData.landmark}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-gray-400 outline-none "
                      
                    />
                  </div>
                <div className="flex justify-between mt-6">
                  <button
                    className="px-4 py-2 text-black  font-semibold outline rounded-lg hover:bg-gray-100"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-800"
                  >
                    {isAddressPresent ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
