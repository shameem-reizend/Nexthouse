

interface AddressDetailsProps{
    addressData:any;
    onEdit:() => void;
}


const AddressDetails = ({addressData,onEdit}:AddressDetailsProps) => {
  return (
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
            onClick={onEdit}
            >
            Edit Address
            </button>
        </div>
        </div>
  )
}

export default AddressDetails