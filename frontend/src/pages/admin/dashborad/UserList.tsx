import type { User } from "./AdminDashboard"

interface UserListProps{
    users:User[]

}

const UserList  = ({ users}:UserListProps) => {

  return (
        <div className=" bg-white p-4 mt-4 rounded-lg relative overflow-x-auto flex justify-center items-center shadow-lg">
          <table className=" w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone_number
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.phone_number} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize"
                  >
                    {u.name}
                  </th>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{u.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  )
}

export default UserList