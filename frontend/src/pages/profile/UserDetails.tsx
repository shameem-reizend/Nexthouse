

const UserDetails = () => {

    const userData = JSON.parse(localStorage.getItem("userData") ||"null");


  return (
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
        </div>  )
}

export default UserDetails