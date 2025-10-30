import { useEffect, useState } from "react";
import axios from "axios";
import {
  createAddressApi,
  getAddressAPI,
  updateAddressApi,
} from "../../api/modules/address.api";
import { toast } from "react-toastify";
import UserDetails from "./UserDetails";
import AddressDetails from "./AddressDetails";
import AddressForm from "./AddressForm";

interface Address {
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: number | undefined;
  landmark: string;
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
    // console.log(response.data)
    setStateList(response.data);

	} catch (error) {
		console.error(error);
	}
}

async function fetchCityData() {
	try {
		const response = await axios.request(cityoptions);
		// console.log(response.data);
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
        {/* user Info      */}
        <UserDetails/>

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
              <AddressDetails addressData={addressData} onEdit={() => setIsEditing(true)}/>
            ) : (

              <AddressForm 
                  addressData={addressData}
                  stateList={stateList}
                  cityList={cityList}
                  selectedcity={selectedcity}
                  selectedState={selectedState}
                  handleChange={handleChange}
                  handleSelectStateChange={handleSelectStateChange}
                  handleSelectCityChange={handleSelectCityChange}
                  handleSubmit={handleSubmit}
                  setIsEditing={()=> setIsEditing(false)}
                  isAddressPresent={isAddressPresent}
               
               />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
