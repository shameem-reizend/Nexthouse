import type { User } from "./AdminDashboard"

interface UserListProps{
    users:User[]
}

const UserList  = ({ users}:UserListProps) => {

  return (
    <div className="bg-white p-4 mt-4 max-h-[calc(100vh-410px)] overflow-y-scroll rounded-lg relative shadow-lg">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
          <thead className="text-sm  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.phone_number} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                  {u.name}
                </th>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">{u.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden max-h-96 space-y-4 overflow-y-scroll">
        {users.map((u) => (
          <div key={u.phone_number} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 capitalize">{u.name}</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center">
                <span className="font-medium mr-2">Email:</span>
                <span className="truncate">{u.email}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Phone:</span>
                <span>{u.phone_number}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserList