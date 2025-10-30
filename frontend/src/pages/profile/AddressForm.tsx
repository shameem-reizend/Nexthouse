interface AddressFormProps{
    addressData:any;
    stateList:any[];
    cityList:any[];
    selectedState:string;
    selectedcity:string;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectStateChange:(e:React.ChangeEvent<HTMLSelectElement>) => void;
    handleSelectCityChange:(e:React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit:(e:React.FormEvent) => void;
    setIsEditing:() => void;
    isAddressPresent:boolean;
}



const AddressForm = ({
  addressData,
  stateList,
  cityList,
  selectedState,
  selectedcity,
  handleChange,
  handleSelectStateChange,
  handleSelectCityChange,
  handleSubmit,
  setIsEditing,
  isAddressPresent
}:AddressFormProps) => {
  return (
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
                    onClick={setIsEditing}
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
              </form>  )
}

export default AddressForm